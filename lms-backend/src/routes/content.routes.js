const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudinary } = require('../config/cloudinary');
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

// Multer configuration using Cloudinary with dynamic resource types
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    let folder, resourceType, allowedFormats;
    
    if (file.fieldname === 'videoFile') {
      folder = 'lms/videos';
      resourceType = 'video';
      allowedFormats = ['mp4', 'avi', 'mov', 'wmv'];
    } else if (file.fieldname === 'pdfFile') {
      folder = 'lms/pdfs';
      resourceType = 'raw';
      allowedFormats = ['pdf'];
    } else if (file.fieldname === 'slideImages') {
      folder = 'lms/images';
      resourceType = 'image';
      allowedFormats = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    }
    
    return {
      folder: folder,
      resource_type: resourceType,
      allowed_formats: allowedFormats,
    };
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'video/mp4',
      'video/avi',
      'video/mov',
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