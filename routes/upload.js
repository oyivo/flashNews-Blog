const router = require("express").Router();
const path = require("path");
const multer = require("multer");
const debug = require("debug")("myapp:server");
const fileUpload = require("express-fileupload");
const fs = require("fs");

const mime = {
  html: "text/html",
  txt: "text/plain",
  css: "text/css",
  gif: "image/gif",
  jpg: "image/jpeg",
  png: "image/png",
  svg: "image/svg+xml",
  js: "application/javascript",
};

router.route("/upload").post(function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  let file = req.files.file;
  let uploadDir = path.join(__dirname, "../public/uploads", file.name);

  file.mv(uploadDir, function (err) {
    if (err) return res.status(500).send(err);
    res.json({ img: `http://localhost:5070/ftp/uploads/${file.name}` });
  });
});

// router.route("/destroy", (req, res) => {
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
