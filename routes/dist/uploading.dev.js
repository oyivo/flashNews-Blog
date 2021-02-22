"use strict";

var router = require('express').Router();

var path = require('path');

var multer = require('multer');

var debug = require('debug')('myapp:server');

var fileUpload = require('express-fileupload');

var fs = require('fs');

var mime = {
  html: 'text/html',
  txt: 'text/plain',
  css: 'text/css',
  gif: 'image/gif',
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  js: 'application/javascript'
};
router.route('/upload').post(function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  } // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file


  var file = req.files.file;
  var uploadDir = path.join(__dirname, '../public/uploads', file.name); // Use the mv() method to place the file somewhere on your server

  file.mv(uploadDir, function (err) {
    if (err) return res.status(500).send(err);
    res.json({
      img: "http://localhost:5070/ftp/uploads/".concat(file.name)
    });
  });
});
router.route('/img').get(function (req, res) {});
router.route('/img').get(function (req, res) {});
module.exports = router;