require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var productsApiRouter = require('./routes/api/products');
var categoriesApiRouter = require('./routes/api/categories');
var customersApiRouter = require('./routes/api/customers');
var ordersApiRouter = require('./routes/api/orders');

var productsAdminRouter = require('./routes/admin/products');
var categoriesAdminRouter = require('./routes/admin/categories');
var customersAdminRouter = require('./routes/admin/customers');
var ordersAdminRouter = require('./routes/admin/orders');
var dashboardAdminRouter = require('./routes/admin/dashboard');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.set('layout','layouts/admin');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);

app.use('/api/products', productsApiRouter);
app.use('/api/categories', categoriesApiRouter);
app.use('/api/customers', customersApiRouter);
app.use('/api/orders', ordersApiRouter);

app.use('/admin/products', productsAdminRouter);
app.use('/admin/categories', categoriesAdminRouter);
app.use('/admin/customers', customersAdminRouter);
app.use('/admin/orders', ordersAdminRouter);
app.use('/admin/dashboard', dashboardAdminRouter);

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
