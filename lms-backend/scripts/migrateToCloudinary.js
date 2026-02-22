/**
 * Migration Script: Upload local images to Cloudinary and update database
 * Run: node scripts/migrateToCloudinary.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Import models
const Course = require('../src/models/Course');
const User = require('../src/models/User');
const Content = require('../src/models/Content');
const Enrollment = require('../src/models/Enrollment');

const UPLOAD_BASE = path.join(__dirname, '../uploads');

async function uploadToCloudinary(localPath, folder, resourceType = 'image') {
  const fullPath = path.join(__dirname, '..', localPath);
  if (!fs.existsSync(fullPath)) {
    console.log(`  ⚠ File not found: ${fullPath}`);
    return null;
  }
  try {
    const result = await cloudinary.uploader.upload(fullPath, {
      folder: folder,
      resource_type: resourceType,
    });
    console.log(`  ✅ Uploaded: ${localPath} → ${result.secure_url}`);
    return result.secure_url;
  } catch (err) {
    console.log(`  ❌ Failed: ${localPath} - ${err.message}`);
    return null;
  }
}

async function migrateCourses() {
  console.log('\n📚 Migrating Course Images...');
  const courses = await Course.find({});
  
  for (const course of courses) {
    let updated = false;
    
    // Migrate thumbnail
    if (course.thumbnail && !course.thumbnail.startsWith('http')) {
      const url = await uploadToCloudinary(course.thumbnail, 'lms/images');
      if (url) {
        course.thumbnail = url;
        updated = true;
      }
    }
    
    // Migrate QR image
    if (course.qrImage && !course.qrImage.startsWith('http')) {
      const url = await uploadToCloudinary(course.qrImage, 'lms/qr-codes');
      if (url) {
        course.qrImage = url;
        updated = true;
      }
    }
    
    if (updated) {
      await course.save();
      console.log(`  📝 Updated course: ${course.name}`);
    }
  }
}

async function migrateUsers() {
  console.log('\n👤 Migrating User Profile Images...');
  const users = await User.find({ profileImage: { $exists: true, $ne: null } });
  
  for (const user of users) {
    if (user.profileImage && !user.profileImage.startsWith('http')) {
      const url = await uploadToCloudinary(user.profileImage, 'lms/images');
      if (url) {
        user.profileImage = url;
        await user.save();
        console.log(`  📝 Updated user: ${user.fullName}`);
      }
    }
  }
}

async function migrateContent() {
  console.log('\n📄 Migrating Content Files...');
  const contents = await Content.find({});
  
  for (const content of contents) {
    let updated = false;
    
    // Migrate filePath (video or pdf)
    if (content.filePath && !content.filePath.startsWith('http')) {
      let folder, resourceType;
      if (content.type === 'video') {
        folder = 'lms/videos';
        resourceType = 'video';
      } else if (content.type === 'pdf') {
        folder = 'lms/pdfs';
        resourceType = 'raw';
      } else {
        folder = 'lms/images';
        resourceType = 'image';
      }
      const url = await uploadToCloudinary(content.filePath, folder, resourceType);
      if (url) {
        content.filePath = url;
        updated = true;
      }
    }
    
    // Migrate slide images
    if (content.slideImages && content.slideImages.length > 0) {
      const newImages = [];
      for (const img of content.slideImages) {
        if (img && !img.startsWith('http')) {
          const url = await uploadToCloudinary(img, 'lms/images');
          newImages.push(url || img);
        } else {
          newImages.push(img);
        }
      }
      content.slideImages = newImages;
      updated = true;
    }
    
    if (updated) {
      await content.save();
      console.log(`  📝 Updated content: ${content.title}`);
    }
  }
}

async function migrateEnrollments() {
  console.log('\n💳 Migrating Payment Proofs...');
  const enrollments = await Enrollment.find({ paymentProof: { $exists: true, $ne: null } });
  
  for (const enrollment of enrollments) {
    if (enrollment.paymentProof && !enrollment.paymentProof.startsWith('http')) {
      const url = await uploadToCloudinary(enrollment.paymentProof, 'lms/payment-proofs');
      if (url) {
        enrollment.paymentProof = url;
        await enrollment.save();
        console.log(`  📝 Updated enrollment: ${enrollment._id}`);
      }
    }
  }
}

async function main() {
  console.log('🚀 Starting Cloudinary Migration...');
  console.log(`   Cloud: ${process.env.CLOUDINARY_CLOUD_NAME}`);
  
  // Connect to database
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Connected to MongoDB');
  
  await migrateCourses();
  await migrateUsers();
  await migrateContent();
  await migrateEnrollments();
  
  console.log('\n🎉 Migration Complete!');
  console.log('Check your Cloudinary Media Library for the uploaded files.');
  
  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
