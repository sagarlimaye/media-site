var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const createError = require('http-errors');
const config = require('./config.json');
var jwt = require('jsonwebtoken');
const crypto = require('crypto');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/news', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var apiRouter = require('./routes/api');
var userSchema = require('./schemas/user');
var User = mongoose.model('User', userSchema, 'users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist', 'media-site')));

app.get('*', function(req, res, next) {
  res.sendFile('/', { root: 'dist/media-site/' });
});

app.use('/api', apiRouter);

module.exports = app;
