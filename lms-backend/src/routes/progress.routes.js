const express = require('express');
const {
  getCourseProgress,
  completeContent,
  getAllProgress,
  sendCertificate,
  downloadCertificate,
} = require('../controllers/progress.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/admin.middleware');

const router = express.Router();

// More specific routes first
router.get('/', protect, authorize('admin'), getAllProgress);
router.put('/:progressId/send-certificate', protect, authorize('admin'), sendCertificate);
router.get('/:progressId/download-certificate', protect, downloadCertificate);

// Less specific routes last
router.get('/:courseId', protect, getCourseProgress);
router.put('/:courseId/complete/:contentId', protect, completeContent);

module.exports = router;