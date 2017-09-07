var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//新加载三个模块
var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);

//载入数据库文件
var db = require('./model/db');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public')));

//加载中间件,存储session
app.use(session({
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 10000
  },
  secret: '45454',
  store: new MongoStore({
    cookieSecret: 'agshavsdhas',
    db: 'blog',
    host: 'localhost'
  })
}));

//router
var routes = require('./routes/routes');
routes(app);

// http server
var http = require('http');
var server = http.createServer(app);

module.exports = server;




