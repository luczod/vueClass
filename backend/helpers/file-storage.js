const multer = require("multer"); //save in disk
const path = require("path");

// cb callback
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/");
  },
  // image name = date + extension , ex: .png
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

module.exports = diskStorage;
