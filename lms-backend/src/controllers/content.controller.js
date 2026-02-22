const Content = require('../models/Content');
const Course = require('../models/Course');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// @desc    Get all content for a course
// @route   GET /api/content/course/:courseId
// @access  Private
exports.getContentByCourse = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.courseId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid course ID',
      });
    }

    const content = await Content.find({ course: req.params.courseId }).sort('order');

    res.status(200).json({
      success: true,
      count: content.length,
      data: content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single content
// @route   GET /api/content/:id
// @access  Private
exports.getContentById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid content ID',
      });
    }

    const content = await Content.findById(req.params.id).populate('course');

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found',
      });
    }

    res.status(200).json({
      success: true,
      data: content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create content (Admin)
// @route   POST /api/content
// @access  Private/Admin
exports.createContent = async (req, res) => {
  try {
    const { courseId, title, type, description, externalLink, duration, order } = req.body;

    if (!courseId || !title || !type) {
      return res.status(400).json({
        success: false,
        message: 'Please provide courseId, title, and type',
      });
    }

    if (!mongoose.isValidObjectId(courseId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid course ID',
      });
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    const contentData = {
      course: courseId,
      title,
      type,
      description: description || '',
      order: order || 0,
    };

    // Handle different content types
    if (type === 'link' || type === 'youtube') {
      if (!externalLink) {
        return res.status(400).json({
          success: false,
          message: 'External link is required for link or youtube type',
        });
      }
      contentData.externalLink = externalLink;
    }

    if (duration) {
      contentData.duration = duration;
    }

    // Handle file uploads
    if (req.files) {
      if (req.files.videoFile) {
        contentData.filePath = req.files.videoFile[0].path;
      }
      if (req.files.pdfFile) {
        contentData.filePath = req.files.pdfFile[0].path;
      }
      if (req.files.slideImages) {
        contentData.slideImages = req.files.slideImages.map((file) => file.path);
      }
    }

    const content = await Content.create(contentData);

    res.status(201).json({
      success: true,
      data: content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update content (Admin)
// @route   PUT /api/content/:id
// @access  Private/Admin
exports.updateContent = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid content ID',
      });
    }

    let content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found',
      });
    }

    const { title, description, externalLink, duration, order } = req.body;

    if (title) content.title = title;
    if (description) content.description = description;
    if (externalLink) content.externalLink = externalLink;
    if (duration) content.duration = duration;
    if (order !== undefined) content.order = order;

    // Handle file updates
    if (req.files) {
      if (req.files.videoFile) {
        // Delete old file if exists
        if (content.filePath && content.type === 'video') {
          const oldPath = path.join(__dirname, '../../', content.filePath);
          if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath);
          }
        }
        content.filePath = req.files.videoFile[0].path;
      }

      if (req.files.pdfFile) {
        if (content.filePath && content.type === 'pdf') {
          const oldPath = path.join(__dirname, '../../', content.filePath);
          if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath);
          }
        }
        content.filePath = req.files.pdfFile[0].path;
      }

      if (req.files.slideImages) {
        // Delete old images
        content.slideImages.forEach((imgPath) => {
          const oldPath = path.join(__dirname, '../../', imgPath);
          if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath);
          }
        });
        content.slideImages = req.files.slideImages.map((file) => file.path);
      }
    }

    await content.save();

    res.status(200).json({
      success: true,
      data: content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete content (Admin)
// @route   DELETE /api/content/:id
// @access  Private/Admin
exports.deleteContent = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid content ID',
      });
    }

    const content = await Content.findByIdAndDelete(req.params.id);

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found',
      });
    }

    // Delete files
    if (content.filePath) {
      const filePath = path.join(__dirname, '../../', content.filePath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    if (content.slideImages && content.slideImages.length > 0) {
      content.slideImages.forEach((imgPath) => {
        const fullPath = path.join(__dirname, '../../', imgPath);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Content deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};