const multer = require("multer");
const path = require("path");

const tmpDir = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDir);
  },
  filename: (req, file, cb) => {
    const { _id: id } = req.user;
    const extension = file.mimetype.split("/")[1];
    cb(null, `${id}.${extension}`);
  },
});

const upload = multer({
  storage: multerConfig,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

module.exports = upload;
