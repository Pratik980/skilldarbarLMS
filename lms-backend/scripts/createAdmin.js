require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../src/models/User');

const email = process.argv[2] || 'skilldarbar26@gmail.com';
const password = process.argv[3] || 'Skilldarbar26';
const fullName = process.argv[4] || 'Admin User';
const phone = process.argv[5] || '0000000000';

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const existing = await User.findOne({ email });
    if (existing) {
      existing.role = 'admin';
      if (!existing.phone) existing.phone = phone;
      if (!existing.fullName) existing.fullName = fullName;
      await existing.save();
      console.log('Admin user updated:', existing.email);
      process.exit(0);
    }

    const admin = await User.create({
      fullName,
      email,
      phone,
      password,
      role: 'admin',
    });

    console.log('Admin user created:', admin.email);
    process.exit(0);
  } catch (error) {
    console.error('Failed to create admin:', error.message);
    process.exit(1);
  }
};

run();
