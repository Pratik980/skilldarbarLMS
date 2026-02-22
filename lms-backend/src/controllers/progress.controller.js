const Progress = require('../models/Progress');
const Content = require('../models/Content');
const Enrollment = require('../models/Enrollment');
const mongoose = require('mongoose');
const PDFDocument = require('pdfkit');
const path = require('path');

// @desc    Get user's course progress
// @route   GET /api/progress/:courseId
// @access  Private
exports.getCourseProgress = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.courseId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid course ID',
      });
    }

    const progress = await Progress.findOne({
      student: req.user.id,
      course: req.params.courseId,
    })
      .populate('course')
      .populate('completedContents');

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: 'Progress not found',
      });
    }

    res.status(200).json({
      success: true,
      data: progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Mark content as completed
// @route   PUT /api/progress/:courseId/complete/:contentId
// @access  Private
exports.completeContent = async (req, res) => {
  try {
    const { courseId, contentId } = req.params;

    if (!mongoose.isValidObjectId(courseId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid course ID',
      });
    }

    if (!mongoose.isValidObjectId(contentId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid content ID',
      });
    }

    // Check enrollment approval
    const enrollment = await Enrollment.findOne({
      student: req.user.id,
      course: courseId,
    });

    if (!enrollment || enrollment.status !== 'approved') {
      return res.status(403).json({
        success: false,
        message: 'You do not have access to this course',
      });
    }

    let progress = await Progress.findOne({
      student: req.user.id,
      course: courseId,
    });

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: 'Progress record not found',
      });
    }

    // Check if content already completed
    if (progress.completedContents.includes(contentId)) {
      return res.status(400).json({
        success: false,
        message: 'Content already completed',
      });
    }

    progress.completedContents.push(contentId);

    // Calculate progress percentage
    const totalContent = await Content.countDocuments({ course: courseId });
    progress.progressPercentage = totalContent
  ? Math.round((progress.completedContents.length / totalContent) * 100)
  : 0;

    // progress.progressPercentage = Math.round(
    //   (progress.completedContents.length / totalContent) * 100
    // );

    progress.lastAccessedAt = Date.now();
    await progress.save();

    res.status(200).json({
      success: true,
      message: 'Content marked as completed',
      data: progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all student progresses (Admin)
// @route   GET /api/progress
// @access  Private/Admin
exports.getAllProgress = async (req, res) => {
  try {
    const { studentId, courseId } = req.query;
    const filter = {};

    if (studentId) filter.student = studentId;
    if (courseId) filter.course = courseId;

    const progress = await Progress.find(filter)
      .populate('student', 'fullName email')
      .populate('course', 'name')
      .sort('-updatedAt');

    res.status(200).json({
      success: true,
      count: progress.length,
      data: progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Send certificate to student (Admin)
// @route   PUT /api/progress/:progressId/send-certificate
// @access  Private/Admin
exports.sendCertificate = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.progressId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid progress ID',
      });
    }

    const progress = await Progress.findById(req.params.progressId).populate('student');

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: 'Progress record not found',
      });
    }

    // Mark certificate as sent (no actual email in this implementation)
    progress.certificateSent = true;
    progress.certificateSentAt = Date.now();
    await progress.save();

    // TODO: Implement actual email sending using nodemailer

    res.status(200).json({
      success: true,
      message: 'Certificate marked as sent',
      data: progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Download certificate as PDF
// @route   GET /api/progress/:progressId/download-certificate
// @access  Private
exports.downloadCertificate = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.progressId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid progress ID',
      });
    }

    const progress = await Progress.findById(req.params.progressId)
      .populate('student', 'fullName email')
      .populate('course', 'name');

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: 'Progress record not found',
      });
    }

    // Check if user is the student or admin
    if (
      req.user.id !== progress.student._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized to download this certificate',
      });
    }

    // Check if certificate was sent
    if (!progress.certificateSent) {
      return res.status(400).json({
        success: false,
        message: 'Certificate has not been issued yet',
      });
    }

    // Create PDF document
    const doc = new PDFDocument({
      size: 'A4',
      margin: 50,
    });

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="Certificate_${progress.student.fullName.replace(/\s+/g, '_')}.pdf"`
    );

    doc.pipe(res);

    // Add certificate content
    // Background color/styling
    doc.fillColor('#1e3a5f');
    doc.fontSize(40).font('Helvetica-Bold').text('Certificate of Completion', {
      align: 'center',
    });

    doc.moveDown(0.5);
    doc.strokeColor('#2563eb').lineWidth(2);
    doc.moveTo(100, doc.y).lineTo(500, doc.y).stroke();

    doc.moveDown(1);
    doc.fillColor('#333333').fontSize(14).font('Helvetica').text(
      'This is to certify that',
      {
        align: 'center',
      }
    );

    doc.moveDown(0.5);
    doc.fillColor('#1e3a5f')
      .fontSize(28)
      .font('Helvetica-Bold')
      .text(progress.student.fullName, {
        align: 'center',
      });

    doc.moveDown(0.8);
    doc.fillColor('#333333').fontSize(14).font('Helvetica').text(
      'has successfully completed the course',
      {
        align: 'center',
      }
    );

    doc.moveDown(0.5);
    doc.fillColor('#1e3a5f')
      .fontSize(18)
      .font('Helvetica-Bold')
      .text(progress.course.name, {
        align: 'center',
      });

    doc.moveDown(1.2);
    doc.fillColor('#333333').fontSize(12).font('Helvetica').text(
      `with a progress of ${progress.progressPercentage}%`,
      {
        align: 'center',
      }
    );

    doc.moveDown(0.8);
    doc.fontSize(10).text(
      `Certificate issued on: ${new Date(progress.certificateSentAt).toLocaleDateString()}`,
      {
        align: 'center',
      }
    );

    doc.moveDown(1.5);
    doc.strokeColor('#2563eb').lineWidth(2);
    doc.moveTo(100, doc.y).lineTo(500, doc.y).stroke();

    doc.moveDown(0.5);
    doc.fillColor('#666666')
      .fontSize(10)
      .font('Helvetica-Oblique')
      .text('Learning Management System - Itahari', {
        align: 'center',
      });

    doc.end();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};