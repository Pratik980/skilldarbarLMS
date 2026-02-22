const express = require('express');
const multer = require('multer');
const path = require('path');
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

// Multer configuration for payment proof upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/payment-proofs/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const uploadPaymentProof = multer({
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

router.get('/my-enrollments', protect, getMyEnrollments);
router.post('/:courseId', protect, uploadPaymentProof.single('paymentProof'), enrollCourse);
router.put('/:enrollmentId/mark-paid', protect, markAsPaid);

router.get('/', protect, authorize('admin'), getAllEnrollments);
router.put('/:enrollmentId/approve', protect, authorize('admin'), approveEnrollment);
router.put('/:enrollmentId/reject', protect, authorize('admin'), rejectEnrollment);

module.exports = router;