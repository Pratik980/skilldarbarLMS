const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide course name'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    fee: {
      type: Number,
      required: [true, 'Please provide course fee'],
      min: 0,
    },
    qrImage: {
      type: String,
      required: [true, 'Please provide QR image path'],
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: String,
      default: 'General',
    },
    duration: {
      type: String,
      required: [true, 'Please provide course duration'],
      default: '0h',
    },
    lectures: {
      type: Number,
      default: 0,
    },
    thumbnail: {
      type: String,
      default: '',
    },
    ratings: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
      reviews: [{
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        review: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      }],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    reviewEnabled: {
      type: Boolean,
      default: true,
    },
    totalEnrollments: {
      type: Number,
      default: 0,
    },
    totalRevenue: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);