const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    completedContents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Content',
      },
    ],
    progressPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    examAttempted: {
      type: Boolean,
      default: false,
    },
    examScore: {
      type: Number,
      default: null,
      min: 0,
      max: 100,
    },
    examPassed: {
      type: Boolean,
      default: false,
    },
    examAttemptedAt: {
      type: Date,
      default: null,
    },
    certificateGenerated: {
      type: Boolean,
      default: false,
    },
    certificateSent: {
      type: Boolean,
      default: false,
    },
    certificateSentAt: {
      type: Date,
      default: null,
    },
    lastAccessedAt: {
      type: Date,
      default: Date.now,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Prevent duplicate progress records
progressSchema.index({ student: 1, course: 1 }, { unique: true });

module.exports = mongoose.model('Progress', progressSchema);