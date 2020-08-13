require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var sendRouter = require('./routes/index');

var app = express();
var cors = require('cors')
const mongoose = require("mongoose");

//connect to mongodb

mongoose
  .connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@ds235388.mlab.com:35388/archives`, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));

//localhost
// mongoose
// .connect(`mongodb://localhost:27017/data`, { useNewUrlParser: true })
// .then(() => console.log("Connected to MongoDB..."))
// .catch(err => console.error("Could not connect to MongoDB..."));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', cors(), sendRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;
