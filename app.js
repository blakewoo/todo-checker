var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const config = require('./config/config')
const mariadb = require("./connectors/mariadb")
const mongodb = require("./connectors/mongodb")

var indexRouter = require('./routes/r_index');
const loginRouter = require('./routes/login')
const userRouter = require('./routes/r_user')
const session = require('express-session');
const MemoryStore = require('memorystore')(session);

var app = express();

const maxAge = 1000 * 60 * 5
const sessionObj = {
  secret: config.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
  store: new MemoryStore({ checkPeriod: maxAge }),
  cookie: {
    maxAge: maxAge
  },
};

app.use(session(sessionObj));

// DB 연결
mariadb.getConnection()
    .then(result =>{ console.log("[SYSTEM] Maria DB connected")})
    .catch(error =>{ console.log(error); console.log("[SYSTEM] Maria DB not connected")})
mongodb()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(config.COOKIE_SECRET_KEY));
app.use(express.static(path.join(__dirname, 'public')));


// router field
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/user', userRouter);
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
