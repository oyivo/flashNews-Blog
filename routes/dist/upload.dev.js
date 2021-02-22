"use strict";

var router = require("express").Router();

var path = require("path");

var multer = require("multer");

var debug = require("debug")("myapp:server");

var fileUpload = require("express-fileupload");

var fs = require("fs");

var mime = {
  html: "text/html",
  txt: "text/plain",
  css: "text/css",
  gif: "image/gif",
  jpg: "image/jpeg",
  png: "image/png",
  svg: "image/svg+xml",
  js: "application/javascript"
};
router.route("/upload").post(function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  var file = req.files.file;
  var uploadDir = path.join(__dirname, "../public/uploads", file.name);
  file.mv(uploadDir, function (err) {
    if (err) return res.status(500).send(err);
    res.json({
      img: "http://localhost:5070/ftp/uploads/".concat(file.name)
    });
  });
}); // router.route("/destroy", (req, res) => {
//   try {
//     const { public_id } = req.body;
//     if (!public_id) return res.status(400).json({ msg: "No images Selected" });
//     uploadDir.destroy(public_id, async (err, result) => {
//       if (err) throw err;
//       res.json({ msg: "Deleted Image" });
//     });
//   } catch (err) {
//     return res.status(500).json({ msg: err.message });
//   }
// });

router.route("/img").get(function (req, res) {});
module.exports = router;