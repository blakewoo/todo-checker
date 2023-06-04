var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const config = require('./config/config')
const mariadb = require("./connectors/mariadb")
const mongodb = require("./connectors/mongodb")

var indexRouter = require('./routes/r_index');
const loginRouter = require('./routes/r_login')
const userRouter = require('./routes/r_user')
const todolistRouter = require('./routes/r_todolist')
const commentlistRouter = require("./routes/r_commentlist")
const todoShareRouter= require("./routes/r_todo_share")
const chattingRouter = require("./routes/r_chatting")
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const helmet = require("helmet");

var app = express();

const maxAge = 1000 * 60 * 30
const sessionObj = {
  secret: config.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
  store: new MemoryStore({ checkPeriod: maxAge }),
  cookie: {
    maxAge: maxAge
  },
};

app.use(helmet.crossOriginEmbedderPolicy());
app.use(helmet.crossOriginOpenerPolicy());
app.use(helmet.crossOriginResourcePolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());
app.use(session(sessionObj));

// DB 연결
mariadb.getConnection()
    .then(result =>{ console.log("[SYSTEM] Maria DB connected")})
    .catch(error =>{ console.log(error); console.log("[SYSTEM] Maria DB not connected")})
mongodb()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(config.COOKIE_SECRET_KEY));
app.use(express.static(path.join(__dirname, 'public')));


// router field
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/todolist', todolistRouter);
app.use('/todo-share',todoShareRouter);
app.use('/chatting', chattingRouter);
//



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
