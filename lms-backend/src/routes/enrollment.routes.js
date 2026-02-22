const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudinary } = require('../config/cloudinary');
const {
  getMyEnrollments,
  enrollCourse,
  markAsPaid,
  getAllEnrollments,
  approveEnrollment,
  rejectEnrollment,
} = require('../controllers/enrollment.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/admin.middleware');

const router = express.Router();

// Multer configuration for payment proof upload using Cloudinary
const paymentStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'lms/payment-proofs',
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
      resource_type: 'image',
    };
  },
});

const uploadPaymentProof = multer({
  storage: paymentStorage,
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

router.get('/my-enrollments', protect, getMyEnrollments);
router.post('/:courseId', protect, uploadPaymentProof.single('paymentProof'), enrollCourse);
router.put('/:enrollmentId/mark-paid', protect, markAsPaid);

router.get('/', protect, authorize('admin'), getAllEnrollments);
router.put('/:enrollmentId/approve', protect, authorize('admin'), approveEnrollment);
router.put('/:enrollmentId/reject', protect, authorize('admin'), rejectEnrollment);

module.exports = router;