const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudinary, imageStorage, qrCodeStorage } = require('../config/cloudinary');
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  toggleCourseStatus,
  addReview,
  getCourseReviews,
  updateReview,
  deleteReview,
} = require('../controllers/course.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/admin.middleware');

const router = express.Router();

// Multer configuration for course images using Cloudinary with dynamic folders
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const folder = file.fieldname === 'qrImage' ? 'lms/qr-codes' : 'lms/images';
    return {
      folder: folder,
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      resource_type: 'image',
    };
  },
});

const uploadCourseImages = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WEBP are allowed.'));
    }
  },
});


router.get('/', getAllCourses);
router.get('/:id', getCourseById);

router.post('/', protect, authorize('admin'), uploadCourseImages.fields([
  { name: 'qrImage', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 }
]), createCourse);

router.put('/:id', protect, authorize('admin'), uploadCourseImages.fields([
  { name: 'qrImage', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 }
]), updateCourse);

router.delete('/:id', protect, authorize('admin'), deleteCourse);
router.patch('/:id/toggle-status', protect, authorize('admin'), toggleCourseStatus);

// Review routes
router.get('/:id/reviews', getCourseReviews);
router.post('/:id/reviews', protect, addReview);
router.put('/:id/reviews', protect, updateReview);
router.delete('/:id/reviews', protect, deleteReview);

module.exports = router;