/**
 * Test Cloudinary Upload
 * Run: node scripts/testCloudinaryUpload.js
 */
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function testUpload() {
  console.log('🧪 Testing Cloudinary Upload...');
  console.log('Config:', {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY ? 'SET' : 'MISSING',
    api_secret: process.env.CLOUDINARY_API_SECRET ? 'SET' : 'MISSING',
  });

  // Check for any image in uploads
  const uploadDir = path.join(__dirname, '../uploads/images');
  
  if (!fs.existsSync(uploadDir)) {
    console.log('❌ No uploads/images directory found');
    return;
  }

  const files = fs.readdirSync(uploadDir).filter(f => !f.startsWith('.'));
  
  if (files.length === 0) {
    console.log('❌ No images found in uploads/images/');
    return;
  }

  const testFile = path.join(uploadDir, files[0]);
  console.log(`\n📤 Uploading test file: ${files[0]}`);

  try {
    const result = await cloudinary.uploader.upload(testFile, {
      folder: 'lms/test',
      resource_type: 'image',
    });

    console.log('\n✅ Upload Successful!');
    console.log('URL:', result.secure_url);
    console.log('Public ID:', result.public_id);
    console.log('\n🎉 Cloudinary is working correctly!');
    console.log('Check your Media Library: https://console.cloudinary.com/console/c-' + process.env.CLOUDINARY_CLOUD_NAME);
  } catch (error) {
    console.log('\n❌ Upload Failed!');
    console.log('Error:', error.message);
    console.log('Full Error:', error);
  }
}

testUpload();
