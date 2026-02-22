const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const Progress = require('../models/Progress');
const User = require('../models/User');
const mongoose = require('mongoose');
const { createNotificationHelper } = require('./notification.controller');

// @desc    Get user's enrollments
// @route   GET /api/enrollments/my-enrollments
// @access  Private
exports.getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user.id })
      .populate('course')
      .sort('-enrolledAt');

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

// @desc    Enroll in a course
// @route   POST /api/enrollments/:courseId
// @access  Private/Student
exports.enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    
    // Log request data for debugging
    console.log('=== Enrollment Request ===');
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
    console.log('Request headers:', req.headers);
    console.log('========================');

    const { enrollmentName, enrollmentEmail, enrollmentPhone } = req.body;

    if (!mongoose.isValidObjectId(courseId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid course ID',
      });
    }

    if (!enrollmentName || !enrollmentEmail || !enrollmentPhone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all enrollment details (name, email, phone)',
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload payment proof image',
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      student: req.user.id,
      course: courseId,
    });

    if (existingEnrollment) {
      // Allow re-enrollment only if previous enrollment was rejected
      if (existingEnrollment.status === 'rejected') {
        // Delete the old rejected enrollment
        await Enrollment.findByIdAndDelete(existingEnrollment._id);
      } else if (existingEnrollment.status === 'pending') {
        return res.status(409).json({
          success: false,
          message: 'You already have a pending enrollment for this course',
        });
      } else if (existingEnrollment.status === 'approved') {
        return res.status(409).json({
          success: false,
          message: 'You are already enrolled in this course',
        });
      }
    }

    const enrollment = await Enrollment.create({
      student: req.user.id,
      course: courseId,
      enrollmentName,
      enrollmentEmail,
      enrollmentPhone,
      paymentProof: req.file.path,
      amount: course.fee,
      status: 'pending',
    });

    // Notify admins about new enrollment via socket + DB notification
    const io = req.app.get('io');
    if (io) {
      io.to('admin_room').emit('newEnrollment', {
        enrollmentId: enrollment._id,
        studentName: enrollmentName,
        courseName: course.name,
        amount: course.fee,
      });
    }

    // Create DB notifications for all admin users
    try {
      const admins = await User.find({ role: 'admin' }).select('_id');
      for (const admin of admins) {
        await createNotificationHelper(
          admin._id,
          'New Enrollment Request',
          `${enrollmentName} has enrolled in "${course.name}" and is awaiting approval.`,
          'enrollment',
          '/admin/enrollments'
        );
      }
    } catch (notifErr) {
      console.error('Error creating admin notifications:', notifErr);
    }

    res.status(201).json({
      success: true,
      data: enrollment,
    });
  } catch (error) {
    console.error('Error enrolling in course:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Mark as paid (Student shows QR)
// @route   PUT /api/enrollments/:enrollmentId/mark-paid
// @access  Private/Student
exports.markAsPaid = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.enrollmentId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid enrollment ID',
      });
    }

    const enrollment = await Enrollment.findById(req.params.enrollmentId);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found',
      });
    }

    if (enrollment.student.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this enrollment',
      });
    }

    if (enrollment.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Enrollment status cannot be updated',
      });
    }

   enrollment.paymentProof = req.body.paymentProof || null; // Keep as pending, waiting for admin approval
    await enrollment.save();

    res.status(200).json({
      success: true,
      message: 'Payment recorded. Waiting for admin approval',
      data: enrollment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all enrollments (Admin)
// @route   GET /api/enrollments
// @access  Private/Admin
exports.getAllEnrollments = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};

    if (status) {
      filter.status = status;
    }

    const enrollments = await Enrollment.find(filter)
      .populate('student', 'fullName email phone')
      .populate('course', 'name fee')
      .sort('-enrolledAt');

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

// @desc    Approve enrollment (Admin)
// @route   PUT /api/enrollments/:enrollmentId/approve
// @access  Private/Admin
exports.approveEnrollment = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.enrollmentId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid enrollment ID',
      });
    }

    const enrollment = await Enrollment.findById(req.params.enrollmentId);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found',
      });
    }

    if (enrollment.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Only pending enrollments can be approved',
      });
    }

    enrollment.status = 'approved';
    enrollment.approvedAt = Date.now();
    enrollment.approvedBy = req.user.id;
    await enrollment.save();

    // Update course stats
    await Course.findByIdAndUpdate(enrollment.course, {
      $inc: {
        totalEnrollments: 1,
        totalRevenue: enrollment.amount,
      },
    });

    // Create progress record
    await Progress.create({
      student: enrollment.student,
      course: enrollment.course,
    });

    // Send notification to student
    const course = await Course.findById(enrollment.course);
    await createNotificationHelper(
      enrollment.student,
      'Enrollment Approved!',
      `Your enrollment for "${course?.name || 'the course'}" has been approved. You can now start learning!`,
      'enrollment',
      `/student/courses/${enrollment.course}`
    );

    // Emit real-time socket event
    const io = req.app.get('io');
    if (io) {
      io.to(`user_${enrollment.student}`).emit('enrollmentUpdate', {
        enrollmentId: enrollment._id,
        status: 'approved',
        courseName: course?.name,
      });
      io.to(`user_${enrollment.student}`).emit('notification', {
        title: 'Enrollment Approved!',
        message: `Your enrollment for "${course?.name}" has been approved.`,
        type: 'enrollment',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Enrollment approved successfully',
      data: enrollment,
    });
  } catch (error) {
    console.error('Error approving enrollment:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Reject enrollment (Admin)
// @route   PUT /api/enrollments/:enrollmentId/reject
// @access  Private/Admin
exports.rejectEnrollment = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.enrollmentId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid enrollment ID',
      });
    }

    const enrollment = await Enrollment.findById(req.params.enrollmentId);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found',
      });
    }

    if (enrollment.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Only pending enrollments can be rejected',
      });
    }

    enrollment.status = 'rejected';
    await enrollment.save();

    // Send notification to student
    const course = await Course.findById(enrollment.course);
    await createNotificationHelper(
      enrollment.student,
      'Enrollment Rejected',
      `Your enrollment for "${course?.name || 'the course'}" has been rejected. Please contact support for details.`,
      'enrollment',
      '/student/my-enrollments'
    );

    // Emit real-time socket event
    const io = req.app.get('io');
    if (io) {
      io.to(`user_${enrollment.student}`).emit('enrollmentUpdate', {
        enrollmentId: enrollment._id,
        status: 'rejected',
        courseName: course?.name,
      });
      io.to(`user_${enrollment.student}`).emit('notification', {
        title: 'Enrollment Rejected',
        message: `Your enrollment for "${course?.name}" has been rejected.`,
        type: 'enrollment',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Enrollment rejected successfully',
      data: enrollment,
    });
  } catch (error) {
    console.error('Error rejecting enrollment:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};