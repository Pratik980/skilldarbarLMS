const express = require('express');
const multer = require('multer');
const {
  signup,
  login,
  getMe,
  updateProfile,
  changePassword,
  uploadProfileImage,
} = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');
const { imageStorage } = require('../config/cloudinary');

const router = express.Router();

// Configure multer for profile image uploads using Cloudinary
const upload = multer({
  storage: imageStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/update-profile', protect, updateProfile);
router.post('/upload-profile-image', protect, upload.single('profileImage'), uploadProfileImage);
router.put('/change-password', protect, changePassword);

module.exports = router;