const multer = require('multer');

const storage = multer.diskStorage({
  destination: `${process.cwd()}/uploads`,
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});
const upload = multer({ storage });

module.exports = upload;
