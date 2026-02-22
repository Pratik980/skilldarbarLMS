const mongoose = require('mongoose');

const examSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide exam title'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    passingPercentage: {
      type: Number,
      required: true,
      default: 60,
      min: 0,
      max: 100,
    },
    totalQuestions: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number, // in minutes
      default: 60,
    },
    questions: [
      {
        _id: mongoose.Schema.Types.ObjectId,
        questionText: {
          type: String,
          required: true,
        },
        questionImage: {
          type: String,
          default: null,
        },
        options: [
          {
            text: {
              type: String,
              required: true,
            },
            isCorrect: {
              type: Boolean,
              required: true,
            },
          },
        ],
        explanation: {
          type: String,
          default: '',
        },
        order: {
          type: Number,
          default: 0,
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Exam', examSchema);
