const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  getContentByCourse,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
} = require('../controllers/content.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/admin.middleware');

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'videoFile') {
      cb(null, 'uploads/videos/');
    } else if (file.fieldname === 'pdfFile') {
      cb(null, 'uploads/pdfs/');
    } else if (file.fieldname === 'slideImages') {
      cb(null, 'uploads/images/');
    }
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'video/mp4',
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/gif',
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
});

router.get('/course/:courseId', getContentByCourse);
router.get('/:id', getContentById);

router.post(
  '/',
  protect,
  authorize('admin'),
  upload.fields([
    { name: 'videoFile', maxCount: 1 },
    { name: 'pdfFile', maxCount: 1 },
    { name: 'slideImages', maxCount: 10 },
  ]),
  createContent
);

router.put(
  '/:id',
  protect,
  authorize('admin'),
  upload.fields([
    { name: 'videoFile', maxCount: 1 },
    { name: 'pdfFile', maxCount: 1 },
    { name: 'slideImages', maxCount: 10 },
  ]),
  updateContent
);

router.delete('/:id', protect, authorize('admin'), deleteContent);

module.exports = router;