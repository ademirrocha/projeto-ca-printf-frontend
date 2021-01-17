const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");

const MAX_SIZE_TWO_MEGABYTES = 2 * 1024 * 1024;

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "public", "uploads"));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        file.key = `${Date.now()}_${hash.toString("hex")}${path.extname(file.originalname)}`;
        file.url = `${process.env.APP_URL}/images/${file.key}`;

        cb(null, file.key);
      });
    },
  }),
  
  s3: multerS3({
    s3: new aws.S3(),
    bucket: process.env.BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        const fileName = `${Date.now()}_${hash.toString("hex")}${path.extname(file.originalname)}`;

        cb(null, 'images/' + fileName);
      });
    },
  }),
};

module.exports = {
  dest: path.resolve(__dirname, "..", "public", "uploads"),
  storage: storageTypes[process.env.STORAGE_TYPE],
  limits: {
    fileSize: MAX_SIZE_TWO_MEGABYTES,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
    "image/jpeg",
    "image/pjpeg",
    "image/png",
    "image/gif",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {

      req.flash('errors', {image:'Formato inválido'})

      cb( null, false);
    }
  },
};