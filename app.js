var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const config = require('./config/config')


var indexRouter = require('./routes/r_index');
const loginRouter = require('./routes/r_login')
const userRouter = require('./routes/r_user')
const todolistRouter = require('./routes/r_todolist')
const todoShareRouter= require("./routes/r_todo_share")
const chattingRouter = require("./routes/r_chatting")
const session = require('express-session');
const fileStore = require("session-file-store")(session)
const helmet = require("helmet");

module.exports = function (mariaDB,mongoDB) {
  var app = express();

  const maxAge = 1000 * 60 * 30
  const sessionObj = {
    secret: config.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: new fileStore(),
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
  app.use('/login', loginRouter(mariaDB,mongoDB));
  app.use('/user', userRouter(mariaDB,mongoDB));
  app.use('/todolist', todolistRouter(mariaDB,mongoDB));
  app.use('/todo-share', todoShareRouter(mariaDB,mongoDB));
  app.use('/chatting', chattingRouter(mariaDB,mongoDB));
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

  return app
}
