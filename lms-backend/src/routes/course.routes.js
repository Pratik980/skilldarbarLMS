const express = require('express');
const multer = require('multer');
const path = require('path');
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

// Multer configuration for course image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'qrImage') {
      cb(null, 'uploads/qr-codes/');
    } else if (file.fieldname === 'thumbnail') {
      cb(null, 'uploads/images/');
    }
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const uploadCourseImages = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
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