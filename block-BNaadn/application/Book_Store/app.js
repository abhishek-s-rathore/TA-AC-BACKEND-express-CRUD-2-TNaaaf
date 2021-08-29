// Requiring the packages
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var mongoose = require('mongoose');

// Requiring the routes
var indexRouter = require('./routes/index');
var booksRouter = require('./routes/books');
// var authorsRouter = require('./routes/authors');

// Connecting to database
mongoose.connect(
  'mongodb://localhost/bookstore',
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    console.log('Connected to database: ', err ? false : true);
  }
);

// Instantiating tha application
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Using middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: false, // true = .sass and false = .scss
    sourceMap: true,
  })
);
app.use(express.static(path.join(__dirname, 'public')));

// Using routing middlewares
app.use('/', indexRouter);
app.use('/books', booksRouter);
// app.use('/authors', authorsRouter);

// Catch 404  error and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
