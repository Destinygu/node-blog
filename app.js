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

//加载路由文件
var routes = require('./routes/routes');

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

//连接数据库
mongoose.Promise = global.Promise;
var db = mongoose.connect("mongodb://127.0.0.1:27017/blog");
db.connection.on("error", function(error) {
  console.log("数据库连接失败：" + error);
});
db.connection.on("open", function() {
  console.log("------数据库连接成功！------");
});


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

routes(app);

/*// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/

module.exports = app;