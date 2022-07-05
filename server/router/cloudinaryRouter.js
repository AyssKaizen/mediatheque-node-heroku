const router = require('express').Router()
const fileUploader = require('../../configs/cloudinary.config');

router.post('/cloudinary-upload', fileUploader.single('file'), (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  res.json({ secure_url: req.file.path });
<<<<<<< HEAD
  
=======
>>>>>>> dd20035 (cloudinary router added and integrated in index)
});

module.exports = router;