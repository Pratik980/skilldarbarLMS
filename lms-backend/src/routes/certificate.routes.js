const express = require('express');
const { protect, authorize } = require('../middleware/auth.middleware');
const {
  getCertificate,
  downloadCertificate,
  getStudentCertificates,
  getAllCertificates,
  verifyCertificate,
} = require('../controllers/certificate.controller');

const router = express.Router();

// Public route
router.get('/:certificateId/verify', verifyCertificate);

// Protected routes
router.get('/course/:courseId', protect, getCertificate);
router.get('/course/:courseId/download', protect, downloadCertificate);
router.get('/', protect, getStudentCertificates);
router.get('/admin/all', protect, authorize('admin'), getAllCertificates);

module.exports = router;
