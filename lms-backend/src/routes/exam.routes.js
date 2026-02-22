const express = require('express');
const { protect, authorize } = require('../middleware/auth.middleware');
const {
  getExamByCourse,
  getExamById,
  getExamForTaking,
  submitExam,
  createExam,
  updateExam,
  deleteExam,
  getExamResults,
} = require('../controllers/exam.controller');

const router = express.Router();

// Public routes
router.get('/course/:courseId', protect, getExamByCourse);
router.get('/take/:courseId', protect, getExamForTaking);
router.post('/:courseId/submit', protect, submitExam);

// Admin routes
router.get('/:examId', protect, authorize('admin'), getExamById);
router.post('/', protect, authorize('admin'), createExam);
router.patch('/:examId', protect, authorize('admin'), updateExam);
router.delete('/:examId', protect, authorize('admin'), deleteExam);
router.get('/admin/:courseId/results', protect, authorize('admin'), getExamResults);

module.exports = router;
