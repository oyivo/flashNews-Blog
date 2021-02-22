"use strict";

require('dotenv').config();

var express = require('express');

var mongoose = require('mongoose');

var morgan = require('morgan');

var cors = require('cors');

var fileUpload = require('express-fileupload');

var cookieParser = require('cookie-parser');

var path = require('path');

var serveIndex = require('serve-index');

var app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());
app.use(fileUpload({
  useTempFiles: true
}));
app.use('/uploads', express["static"]('uploads'));
app.use('/ftp', express["static"]('public'), serveIndex('public', {
  'icons': true
})); // Routes

app.use('/user', require('./routes/userRouter'));
app.use('/api', require('./routes/categoryRouter'));
app.use('/api', require('./routes/articleRouter'));
app.use('/api', require('./routes/commentRouter'));
app.use('/api', require('./routes/upload')); // app.use('/api', require('./routes/uploading'))
// Connect to mongodb

var URL = process.env.DB_CONNECTION;
mongoose.connect(URL, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function (err) {
  if (err) throw err;
  console.log("Connected to MongoDB");
});
var PORT = process.env.PORT || 5070;
app.listen(PORT, function () {
  console.log('Server is running on port', PORT);
});