const express = require('express');
const { getDashboard, getAllUsers, toggleUserStatus, getUserEnrollments, getCourseAnalytics, getAllCoursesAnalytics, getSettings, updateSettings } = require('../controllers/admin.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/admin.middleware');

const router = express.Router();

router.use(protect, authorize('admin'));

router.get('/dashboard', getDashboard);
router.get('/users', getAllUsers);
router.put('/users/:userId/toggle-status', toggleUserStatus);
router.get('/users/:userId/enrollments', getUserEnrollments);
router.get('/analytics/courses', getAllCoursesAnalytics);
router.get('/courses/:courseId/analytics', getCourseAnalytics);
router.get('/settings', getSettings);
router.put('/settings', updateSettings);

module.exports = router;