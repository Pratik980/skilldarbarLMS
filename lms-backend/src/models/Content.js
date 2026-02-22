const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide content title'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['video', 'pdf', 'image', 'link', 'youtube'],
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    // For video, pdf, image
    filePath: {
      type: String,
      default: null,
    },
    // For external or YouTube links
    externalLink: {
      type: String,
      default: null,
    },
    // For image slides (array)
    slideImages: [
      {
        type: String,
        default: null,
      },
    ],
    duration: {
      type: Number, // in minutes
      default: null,
    },
    order: {
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

module.exports = mongoose.model('Content', contentSchema);