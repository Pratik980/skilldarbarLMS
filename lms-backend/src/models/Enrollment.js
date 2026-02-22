const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema(
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
    enrollmentName: {
      type: String,
      required: [true, 'Please provide name for enrollment'],
      trim: true,
    },
    enrollmentEmail: {
      type: String,
      required: [true, 'Please provide email'],
      trim: true,
    },
    enrollmentPhone: {
      type: String,
      required: [true, 'Please provide phone number'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      default: 'manual-qr',
    },
    paymentProof: {
      type: String,
      required: [true, 'Please provide payment proof'],
    },
    amount: {
      type: Number,
      required: true,
    },
    enrolledAt: {
      type: Date,
      default: Date.now,
    },
    approvedAt: {
      type: Date,
      default: null,
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  { timestamps: true }
);

// Prevent duplicate enrollments
enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);