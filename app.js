const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/random-posts', (req, res) => {
  const randomPosts = Array.from({ length: 10 }, (_, id) => ({
    id,
    title: `Post ${id + 1}`,
    content: `This is the content for post ${id + 1}`,
    author: `Author ${id + 1}`
  }));
  res.json(randomPosts);
});

app.post('/submit', (req, res) => {
  const data = req.body;
  res.json({ message: 'Data received successfully', data });
});

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
