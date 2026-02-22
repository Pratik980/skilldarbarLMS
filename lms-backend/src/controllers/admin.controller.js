const User = require('../models/User');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const Progress = require('../models/Progress');
const Settings = require('../models/Settings');
const SiteStat = require('../models/SiteStat');
const mongoose = require('mongoose');

// @desc    Get dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
exports.getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalCourses = await Course.countDocuments();
    const totalEnrollments = await Enrollment.countDocuments();

    // Calculate total revenue
    const enrollmentStats = await Enrollment.aggregate([
      { $match: { status: 'approved', approvedAt: { $ne: null } } },
      { $group: { _id: null, totalRevenue: { $sum: '$amount' } } },
    ]);

    const totalRevenue = enrollmentStats[0]?.totalRevenue || 0;

    const visitorStat = await SiteStat.findOne({ key: 'visitors' });
    const visitorCount = visitorStat?.visitorCount || 0;

    // Revenue per course
    const revenuePerCourse = await Enrollment.aggregate([
      { $match: { status: 'approved' } },
      {
        $group: {
          _id: '$course',
          courseRevenue: { $sum: '$amount' },
          enrollmentCount: { $sum: 1 },
        },
      },
      { $lookup: { from: 'courses', localField: '_id', foreignField: '_id', as: 'course' } },
      { $unwind: '$course' },
      { $project: { courseName: '$course.name', courseRevenue: 1, enrollmentCount: 1 } },
    ]);

    // Monthly revenue
    const monthlyRevenue = await Enrollment.aggregate([
      { $match: { status: 'approved' } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$approvedAt' } },
          revenue: { $sum: '$amount' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Weekly revenue (last 12 weeks)
    const twelveWeeksAgo = new Date();
    twelveWeeksAgo.setDate(twelveWeeksAgo.getDate() - 84);
    const weeklyRevenue = await Enrollment.aggregate([
      { $match: { status: 'approved', approvedAt: { $gte: twelveWeeksAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-W%V', date: '$approvedAt' } },
          revenue: { $sum: '$amount' },
          enrollments: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Enrolled vs Completed stats
    const enrolledCount = await Enrollment.countDocuments({ status: 'approved' });
    const completedCount = await Enrollment.countDocuments({ 
      status: 'approved', 
      examPassed: true 
    });

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalStudents,
        totalAdmins: totalUsers - totalStudents,
        totalCourses,
        totalEnrollments,
        totalRevenue,
        visitorCount,
        revenuePerCourse,
        monthlyRevenue,
        weeklyRevenue,
        enrolledCount,
        completedCount,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
  try {
    const { role, isActive } = req.query;
    const filter = {};

    if (role) filter.role = role;
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    const users = await User.find(filter).sort('-createdAt');

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Activate/Deactivate user
// @route   PUT /api/admin/users/:userId/toggle-status
// @access  Private/Admin
exports.toggleUserStatus = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID',
      });
    }

    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get user's enrollment history
// @route   GET /api/admin/users/:userId/enrollments
// @access  Private/Admin
exports.getUserEnrollments = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID',
      });
    }

    const enrollments = await Enrollment.find({ student: req.params.userId })
      .populate('course')
      .populate('approvedBy', 'fullName email');

    res.status(200).json({
      success: true,
      count: enrollments.length,
      data: enrollments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get course analytics
// @route   GET /api/admin/courses/:courseId/analytics
// @access  Private/Admin
exports.getCourseAnalytics = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.courseId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid course ID',
      });
    }

    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    const totalEnrollments = await Enrollment.countDocuments({ course: req.params.courseId });
    const approvedEnrollments = await Enrollment.countDocuments({
      course: req.params.courseId,
      status: 'approved',
    });
    const pendingEnrollments = await Enrollment.countDocuments({
      course: req.params.courseId,
      status: 'pending',
    });
    const rejectedEnrollments = await Enrollment.countDocuments({
      course: req.params.courseId,
      status: 'rejected',
    });

    // Revenue for this course
    const revenueAgg = await Enrollment.aggregate([
      { $match: { course: course._id, status: 'approved' } },
      { $group: { _id: null, totalRevenue: { $sum: '$amount' } } },
    ]);
    const courseRevenue = revenueAgg[0]?.totalRevenue || 0;

    // Completion rate
    const studentsProgress = await Progress.find({ course: req.params.courseId })
      .populate('student', 'fullName email')
      .sort('-progressPercentage');

    const completedStudents = studentsProgress.filter(p => p.progressPercentage === 100).length;
    const completionRate = approvedEnrollments > 0 ? Math.round((completedStudents / approvedEnrollments) * 100) : 0;

    // Reviews/feedback summary
    const reviews = course.ratings?.reviews || [];
    const avgRating = course.ratings?.average || 0;
    const reviewCount = course.ratings?.count || 0;

    res.status(200).json({
      success: true,
      data: {
        course,
        enrollmentStats: {
          total: totalEnrollments,
          approved: approvedEnrollments,
          pending: pendingEnrollments,
          rejected: rejectedEnrollments,
        },
        revenue: courseRevenue,
        completionRate,
        reviewSummary: {
          averageRating: avgRating,
          totalReviews: reviewCount,
          recentReviews: reviews.slice(0, 5),
        },
        studentProgress: studentsProgress,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all courses analytics (listing)
// @route   GET /api/admin/analytics/courses
// @access  Private/Admin
exports.getAllCoursesAnalytics = async (req, res) => {
  try {
    const { search } = req.query;
    
    let filter = {};
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    const courses = await Course.find(filter)
      .populate('instructor', 'fullName email')
      .sort('-createdAt');

    // Get enrollment stats for all courses
    const courseAnalytics = await Promise.all(
      courses.map(async (course) => {
        const totalEnrollments = await Enrollment.countDocuments({ course: course._id });
        const approvedEnrollments = await Enrollment.countDocuments({ course: course._id, status: 'approved' });
        
        const revenueAgg = await Enrollment.aggregate([
          { $match: { course: course._id, status: 'approved' } },
          { $group: { _id: null, totalRevenue: { $sum: '$amount' } } },
        ]);
        const revenue = revenueAgg[0]?.totalRevenue || 0;

        const progressList = await Progress.find({ course: course._id });
        const completedStudents = progressList.filter(p => p.progressPercentage === 100).length;
        const completionRate = approvedEnrollments > 0 ? Math.round((completedStudents / approvedEnrollments) * 100) : 0;

        return {
          _id: course._id,
          name: course.name,
          category: course.category,
          fee: course.fee,
          instructor: course.instructor,
          totalEnrollments,
          approvedEnrollments,
          revenue,
          completionRate,
          avgRating: course.ratings?.average || 0,
          reviewCount: course.ratings?.count || 0,
          isActive: course.isActive,
          createdAt: course.createdAt,
        };
      })
    );

    res.status(200).json({
      success: true,
      count: courseAnalytics.length,
      data: courseAnalytics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get settings
// @route   GET /api/admin/settings
// @access  Private/Admin
exports.getSettings = async (req, res) => {
  try {
    const settings = await Settings.findOneAndUpdate(
      { key: 'default' },
      { $setOnInsert: { key: 'default' } },
      { returnDocument: 'after', upsert: true }
    );

    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update settings
// @route   PUT /api/admin/settings
// @access  Private/Admin
exports.updateSettings = async (req, res) => {
  try {
    const { instituteName, adminEmail, contactNumber } = req.body;

    const settings = await Settings.findOneAndUpdate(
      { key: 'default' },
      {
        $set: {
          instituteName,
          adminEmail,
          contactNumber,
        },
        $setOnInsert: { key: 'default' },
      },
      { returnDocument: 'after', upsert: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};