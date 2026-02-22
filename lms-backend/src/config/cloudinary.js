const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage for course images and thumbnails
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'lms/images',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [{ width: 1200, height: 800, crop: 'limit' }],
  },
});

// Storage for PDFs
const pdfStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'lms/pdfs',
    allowed_formats: ['pdf'],
    resource_type: 'raw',
  },
});

// Storage for videos
const videoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'lms/videos',
    allowed_formats: ['mp4', 'avi', 'mov', 'wmv'],
    resource_type: 'video',
  },
});

// Storage for payment proofs
const paymentProofStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'lms/payment-proofs',
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
  },
});

// Storage for QR codes
const qrCodeStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'lms/qr-codes',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

module.exports = {
  cloudinary,
  imageStorage,
  pdfStorage,
  videoStorage,
  paymentProofStorage,
  qrCodeStorage,
};
