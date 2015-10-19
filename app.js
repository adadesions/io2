var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mailer = require('express-mailer');
var prerender = require('prerender-node');

var routes = require('./routes/index');
var users = require('./routes/users');
var apis = require('./routes/api');

var app = express();

//DB Init
mongoose.connect('mongodb://localhost/io');
var db = mongoose.connection;

//Mailer Setup
mailer.extend(app, {
  from: 'robot@adacode.io',
  host: 'smtp.zoho.com', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: 'robot@adacode.io',
    pass: 'adacode9898'
  }
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'views')));


//Prerender
app.use(prerender);
// app.use('/', routes);
app.use('/users', users);
app.use('/api', apis);

app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.render('mainApp/main', { root: __dirname });
});

//MongoDB
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("Mongodb ststus: open connection");
});

db.on('disconnected', function() {
  console.log("Mongodb status: disconnected")
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
