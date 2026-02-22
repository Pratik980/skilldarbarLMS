const Course = require('../models/Course');
const Content = require('../models/Content');
const Enrollment = require('../models/Enrollment');
const SiteStat = require('../models/SiteStat');
const mongoose = require('mongoose');

const incrementVisitorCount = async () => {
  await SiteStat.findOneAndUpdate(
    { key: 'visitors' },
    { $inc: { visitorCount: 1 } },
    { returnDocument: 'after', upsert: true }
  );
};

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isActive: true })
      .populate('instructor', 'fullName email')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single course with content
// @route   GET /api/courses/:id
// @access  Public
exports.getCourseById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid course ID',
      });
    }

    const course = await Course.findById(req.params.id).populate('instructor', 'fullName email');

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    const content = await Content.find({ course: req.params.id }).sort('order');

    await incrementVisitorCount();

    res.status(200).json({
      success: true,
      data: {
        course,
        content,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create course (Admin only)
// @route   POST /api/courses
// @access  Private/Admin
exports.createCourse = async (req, res) => {
  try {
    console.log('=== CREATE COURSE REQUEST ===');
    console.log('Body:', req.body);
    console.log('Files:', req.files);

    const { name, description, fee, category, duration, lectures, reviewEnabled } = req.body;

    if (!name || !fee) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    if (!req.files || !req.files.qrImage || !req.files.qrImage[0]) {
      console.log('❌ No QR image uploaded');
      return res.status(400).json({
        success: false,
        message: 'Please upload a QR code image',
      });
    }

    // Debug: Log uploaded file info
    console.log('✅ Uploaded QR Image:', req.files.qrImage[0].path);
    if (req.files.thumbnail) {
      console.log('✅ Uploaded Thumbnail:', req.files.thumbnail[0].path);
    }

    const courseData = {
      name,
      description: description || '',
      fee,
      qrImage: req.files.qrImage[0].path,
      category: category || 'General',
      instructor: req.user.id,
      duration: duration || '0h',
      lectures: lectures || 0,
      reviewEnabled: reviewEnabled !== 'false' && reviewEnabled !== false,
    };

    if (req.files.thumbnail && req.files.thumbnail[0]) {
      courseData.thumbnail = req.files.thumbnail[0].path;
    }

    console.log('💾 Saving course data:', courseData);
    const course = await Course.create(courseData);
    console.log('🎉 Course created successfully:', course._id);

    res.status(201).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error('❌ Course creation error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update course (Admin only)
// @route   PUT /api/courses/:id
// @access  Private/Admin
exports.updateCourse = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid course ID',
      });
    }

    let course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    const updateData = { ...req.body };

    // Handle reviewEnabled boolean from FormData string
    if (updateData.reviewEnabled !== undefined) {
      updateData.reviewEnabled = updateData.reviewEnabled !== 'false' && updateData.reviewEnabled !== false;
    }

    if (req.files) {
      if (req.files.qrImage && req.files.qrImage[0]) {
        updateData.qrImage = req.files.qrImage[0].path;
      }
      if (req.files.thumbnail && req.files.thumbnail[0]) {
        updateData.thumbnail = req.files.thumbnail[0].path;
      }
    }

    course = await Course.findByIdAndUpdate(req.params.id, updateData, {
      returnDocument: 'after',
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete course (Admin only)
// @route   DELETE /api/courses/:id
// @access  Private/Admin
exports.deleteCourse = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid course ID',
      });
    }

    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    // Delete all content related to this course
    await Content.deleteMany({ course: req.params.id });

    res.status(200).json({
      success: true,
      message: 'Course deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Toggle course active status (Admin only)
// @route   PATCH /api/courses/:id/toggle-status
// @access  Private/Admin
exports.toggleCourseStatus = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid course ID',
      });
    }

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    course.isActive = !course.isActive;
    await course.save();

    res.status(200).json({
      success: true,
      message: `Course ${course.isActive ? 'activated' : 'deactivated'} successfully`,
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Add a review to a course
// @route   POST /api/courses/:id/reviews
// @access  Private (enrolled students only)
exports.addReview = async (req, res) => {
  try {
    const { rating, review } = req.body;
    const courseId = req.params.id;
    const userId = req.user._id;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: 'Rating must be between 1 and 5' });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    if (!course.reviewEnabled) {
      return res.status(403).json({ success: false, message: 'Reviews are disabled for this course' });
    }

    // Check if user has an approved enrollment
    const enrollment = await Enrollment.findOne({
      student: userId,
      course: courseId,
      status: 'approved',
    });
    if (!enrollment) {
      return res.status(403).json({ success: false, message: 'You must be enrolled and approved to review this course' });
    }

    // Check for duplicate review
    const existingReview = course.ratings.reviews.find(
      r => r.user.toString() === userId.toString()
    );
    if (existingReview) {
      return res.status(400).json({ success: false, message: 'You have already reviewed this course' });
    }

    course.ratings.reviews.push({ user: userId, rating: Number(rating), review: review || '' });

    // Recalculate average and count
    const reviews = course.ratings.reviews;
    course.ratings.count = reviews.length;
    course.ratings.average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await course.save();

    // Populate the newly added review's user info
    const savedCourse = await Course.findById(courseId).populate('ratings.reviews.user', 'fullName email profileImage');
    const newReview = savedCourse.ratings.reviews[savedCourse.ratings.reviews.length - 1];

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: newReview,
      ratings: { average: savedCourse.ratings.average, count: savedCourse.ratings.count },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get reviews for a course
// @route   GET /api/courses/:id/reviews
// @access  Public
exports.getCourseReviews = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('ratings.reviews.user', 'fullName email profileImage')
      .select('ratings reviewEnabled name');

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    // Sort reviews newest first
    const reviews = [...course.ratings.reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json({
      success: true,
      data: {
        reviews,
        average: course.ratings.average,
        count: course.ratings.count,
        reviewEnabled: course.reviewEnabled,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update own review
// @route   PUT /api/courses/:id/reviews
// @access  Private
exports.updateReview = async (req, res) => {
  try {
    const { rating, review } = req.body;
    const courseId = req.params.id;
    const userId = req.user._id;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: 'Rating must be between 1 and 5' });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const existingReview = course.ratings.reviews.find(
      r => r.user.toString() === userId.toString()
    );
    if (!existingReview) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    existingReview.rating = Number(rating);
    existingReview.review = review || '';
    existingReview.createdAt = Date.now();

    // Recalculate average
    const reviews = course.ratings.reviews;
    course.ratings.count = reviews.length;
    course.ratings.average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await course.save();

    res.status(200).json({
      success: true,
      message: 'Review updated successfully',
      ratings: { average: course.ratings.average, count: course.ratings.count },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete own review
// @route   DELETE /api/courses/:id/reviews
// @access  Private
exports.deleteReview = async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user._id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const reviewIndex = course.ratings.reviews.findIndex(
      r => r.user.toString() === userId.toString()
    );
    if (reviewIndex === -1) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    course.ratings.reviews.splice(reviewIndex, 1);

    // Recalculate average
    const reviews = course.ratings.reviews;
    course.ratings.count = reviews.length;
    course.ratings.average = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

    await course.save();

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully',
      ratings: { average: course.ratings.average, count: course.ratings.count },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};