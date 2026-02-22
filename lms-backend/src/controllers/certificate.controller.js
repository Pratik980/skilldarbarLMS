const Certificate = require('../models/Certificate');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// @desc    Get certificate by course
// @route   GET /api/certificates/course/:courseId
// @access  Private
exports.getCertificate = async (req, res) => {
  try {
    const { courseId } = req.params;

    const certificate = await Certificate.findOne({
      student: req.user.id,
      course: courseId,
    }).populate('course', 'name');

    if (!certificate) {
      return res.status(404).json({ success: false, message: 'Certificate not found' });
    }

    res.status(200).json({ success: true, data: certificate });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Download certificate PDF
// @route   GET /api/certificates/course/:courseId/download
// @access  Private
exports.downloadCertificate = async (req, res) => {
  try {
    const { courseId } = req.params;

    const certificate = await Certificate.findOne({
      student: req.user.id,
      course: courseId,
    }).populate('student', 'fullName').populate('course', 'name');

    if (!certificate) {
      return res.status(404).json({ success: false, message: 'Certificate not found' });
    }

    // Create PDF
    const doc = new PDFDocument();
    const filename = `certificate-${certificate.certificateId}.pdf`;
    const filepath = path.join(__dirname, '../../uploads', filename);

    // Ensure uploads directory exists
    if (!fs.existsSync(path.join(__dirname, '../../uploads'))) {
      fs.mkdirSync(path.join(__dirname, '../../uploads'), { recursive: true });
    }

    const stream = fs.createWriteStream(filepath);

    stream.on('finish', () => {
      res.download(filepath, filename, (err) => {
        if (err) {
          console.error('Download error:', err);
        }
        // Optional: Delete file after download
        // fs.unlinkSync(filepath);
      });
    });

    doc.pipe(stream);

    // === PROFESSIONAL CERTIFICATE DESIGN ===
    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;

    // Outer border (double line effect)
    doc.lineWidth(3).rect(30, 30, pageWidth - 60, pageHeight - 60).stroke('#1a365d');
    doc.lineWidth(1).rect(38, 38, pageWidth - 76, pageHeight - 76).stroke('#2b6cb0');

    // Inner decorative border
    doc.lineWidth(0.5).rect(46, 46, pageWidth - 92, pageHeight - 92).stroke('#cbd5e0');

    // Top decorative line
    doc.moveTo(80, 100).lineTo(pageWidth - 80, 100).lineWidth(2).stroke('#c9a84c');
    doc.moveTo(80, 104).lineTo(pageWidth - 80, 104).lineWidth(0.5).stroke('#c9a84c');

    // Header
    doc.moveDown(4);
    doc.font('Helvetica').fontSize(13).fillColor('#718096').text('CERTIFICATE', { align: 'center' });
    doc.moveDown(0.2);
    doc.font('Helvetica-Bold').fontSize(32).fillColor('#1a365d').text('OF COMPLETION', { align: 'center' });

    // Gold accent line under title
    const titleLineY = doc.y + 10;
    doc.moveTo(pageWidth / 2 - 80, titleLineY).lineTo(pageWidth / 2 + 80, titleLineY).lineWidth(2).stroke('#c9a84c');
    doc.moveTo(pageWidth / 2 - 60, titleLineY + 5).lineTo(pageWidth / 2 + 60, titleLineY + 5).lineWidth(0.5).stroke('#c9a84c');

    // Body text
    doc.moveDown(2.5);
    doc.font('Helvetica').fontSize(13).fillColor('#4a5568').text('This is to certify that', { align: 'center' });

    doc.moveDown(0.8);
    doc.font('Helvetica-Bold').fontSize(28).fillColor('#1a365d').text(certificate.student.fullName, { align: 'center' });

    // Underline under name
    const nameLineY = doc.y + 5;
    doc.moveTo(pageWidth / 2 - 120, nameLineY).lineTo(pageWidth / 2 + 120, nameLineY).lineWidth(0.5).stroke('#cbd5e0');

    doc.moveDown(1);
    doc.font('Helvetica').fontSize(13).fillColor('#4a5568').text('has successfully completed the course', { align: 'center' });

    doc.moveDown(0.8);
    doc.font('Helvetica-Bold').fontSize(22).fillColor('#2b6cb0').text(certificate.course.name, { align: 'center' });

    doc.moveDown(1.2);
    doc.font('Helvetica').fontSize(12).fillColor('#718096').text(`with a score of ${certificate.score}%`, { align: 'center' });

    // Details section
    doc.moveDown(2.5);
    const detailsY = doc.y;
    const leftCol = 140;
    const rightCol = pageWidth - 200;

    // Left: Date
    doc.font('Helvetica').fontSize(10).fillColor('#a0aec0').text('DATE ISSUED', leftCol, detailsY, { width: 150, align: 'center' });
    doc.moveDown(0.3);
    doc.font('Helvetica-Bold').fontSize(12).fillColor('#2d3748').text(
      new Date(certificate.issuedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      leftCol, doc.y, { width: 150, align: 'center' }
    );
    // Line under date
    doc.moveTo(leftCol + 10, doc.y + 8).lineTo(leftCol + 140, doc.y + 8).lineWidth(0.5).stroke('#cbd5e0');

    // Right: Certificate ID
    doc.font('Helvetica').fontSize(10).fillColor('#a0aec0').text('CERTIFICATE ID', rightCol, detailsY, { width: 150, align: 'center' });
    doc.moveDown(0.3);
    doc.font('Helvetica-Bold').fontSize(11).fillColor('#2d3748').text(
      certificate.certificateId,
      rightCol, doc.y, { width: 150, align: 'center' }
    );
    // Line under ID
    doc.moveTo(rightCol + 10, doc.y + 8).lineTo(rightCol + 140, doc.y + 8).lineWidth(0.5).stroke('#cbd5e0');

    // Bottom decorative line
    const bottomLineY = pageHeight - 100;
    doc.moveTo(80, bottomLineY).lineTo(pageWidth - 80, bottomLineY).lineWidth(2).stroke('#c9a84c');
    doc.moveTo(80, bottomLineY + 4).lineTo(pageWidth - 80, bottomLineY + 4).lineWidth(0.5).stroke('#c9a84c');

    // Footer
    doc.font('Helvetica').fontSize(9).fillColor('#a0aec0').text(
      'This certificate is issued upon successful completion of the course and passing the final examination.',
      80, bottomLineY + 16, { align: 'center', width: pageWidth - 160 }
    );

    doc.end();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get student certificates
// @route   GET /api/certificates
// @access  Private
exports.getStudentCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({ student: req.user.id }).populate('course', 'name');

    res.status(200).json({ success: true, data: certificates });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Verify certificate (public - no auth)
// @route   GET /api/certificates/:certificateId/verify
// @access  Public
exports.verifyCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;

    const certificate = await Certificate.findOne({ certificateId })
      .populate('student', 'fullName email')
      .populate('course', 'name')
      .populate('exam', 'title');

    if (!certificate) {
      return res.status(404).json({ success: false, message: 'Certificate not found' });
    }

    res.status(200).json({
      success: true,
      data: {
        certificateId: certificate.certificateId,
        studentName: certificate.student.fullName,
        courseName: certificate.course.name,
        score: certificate.score,
        issuedDate: certificate.issuedDate,
        valid: true,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all certificates (admin)
// @route   GET /api/certificates/admin/all
// @access  Private/Admin
exports.getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find()
      .populate('student', 'fullName email')
      .populate('course', 'name');

    res.status(200).json({ success: true, data: certificates });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
