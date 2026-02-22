const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: 'default',
      unique: true,
    },
    instituteName: {
      type: String,
      default: 'LMS Institute',
      trim: true,
    },
    adminEmail: {
      type: String,
      default: '',
      trim: true,
      lowercase: true,
    },
    contactNumber: {
      type: String,
      default: '',
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Settings', settingsSchema);
