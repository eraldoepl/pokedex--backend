const multer = require("multer");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const resizeImage = async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `pokemonType-${Math.round(
    Math.random() * 1e9
  )}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/images/types/${req.file.filename}`);

  next();
};

exports.upload = upload;
exports.resizeImage = resizeImage;
