const Exam = require('../models/Exam');
const Course = require('../models/Course');
const Progress = require('../models/Progress');
const Certificate = require('../models/Certificate');
const mongoose = require('mongoose');

// @desc    Get exam by course ID
// @route   GET /api/exams/course/:courseId
// @access  Private
exports.getExamByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!mongoose.isValidObjectId(courseId)) {
      return res.status(400).json({ success: false, message: 'Invalid course ID' });
    }

    const exam = await Exam.findOne({ course: courseId });

    if (!exam) {
      return res.status(404).json({ success: false, message: 'No exam found for this course' });
    }

    res.status(200).json({ success: true, data: exam });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get exam by exam ID (Admin)
// @route   GET /api/exams/:examId
// @access  Private/Admin
exports.getExamById = async (req, res) => {
  try {
    const { examId } = req.params;

    if (!mongoose.isValidObjectId(examId)) {
      return res.status(400).json({ success: false, message: 'Invalid exam ID' });
    }

    const exam = await Exam.findById(examId);

    if (!exam) {
      return res.status(404).json({ success: false, message: 'Exam not found' });
    }

    res.status(200).json({ success: true, data: exam });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get exam for taking (without answers)
// @route   GET /api/exams/take/:courseId
// @access  Private
exports.getExamForTaking = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Check student progress
    const progress = await Progress.findOne({
      student: req.user.id,
      course: courseId,
    });

    if (!progress) {
      return res.status(404).json({ success: false, message: 'Progress record not found' });
    }

    // Check if 100% completed
    if (progress.progressPercentage < 100) {
      return res.status(403).json({
        success: false,
        message: `Course must be 100% completed before taking exam. Current progress: ${progress.progressPercentage}%`,
      });
    }

    // Check if already attempted
    if (progress.examAttempted) {
      return res.status(403).json({
        success: false,
        message: 'You have already attempted this exam. Only one attempt is allowed.',
      });
    }

    const exam = await Exam.findOne({ course: courseId });

    if (!exam) {
      return res.status(404).json({ success: false, message: 'Exam not found' });
    }

    // Remove correct answer indicators before sending to student
    const examWithoutAnswers = exam.toObject();
    examWithoutAnswers.questions = exam.questions.map((q) => ({
      _id: q._id,
      questionText: q.questionText,
      questionImage: q.questionImage,
      options: q.options.map((opt) => ({ text: opt.text })),
      explanation: q.explanation,
    }));

    res.status(200).json({ success: true, data: examWithoutAnswers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Submit exam answers and get score
// @route   POST /api/exams/:courseId/submit
// @access  Private
exports.submitExam = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { answers } = req.body;

    console.log('Submit exam - courseId:', courseId);

    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({ success: false, message: 'Invalid answers format' });
    }

    // Get student progress
    let progress = await Progress.findOne({
      student: req.user.id,
      course: courseId,
    });

    if (!progress) {
      return res.status(404).json({ success: false, message: 'Progress record not found' });
    }

    // Check if already attempted
    if (progress.examAttempted) {
      return res.status(403).json({ success: false, message: 'You have already attempted this exam' });
    }

    // Check if 100% completed
    if (progress.progressPercentage < 100) {
      return res.status(403).json({ success: false, message: 'Course must be 100% completed before taking exam' });
    }

    const exam = await Exam.findOne({ course: courseId });

    if (!exam) {
      return res.status(404).json({ success: false, message: 'Exam not found' });
    }

    console.log('Exam questions count:', exam.questions.length);

    // Calculate score
    let correctAnswers = 0;
    const totalQuestions = exam.questions.length;

    exam.questions.forEach((question, qIndex) => {
      try {
        // Try matching with string ID first, then direct ID
        const questionId = question._id ? question._id.toString() : null;
        let studentAnswer = answers[questionId] !== undefined 
          ? answers[questionId] 
          : answers[question._id];

        if (studentAnswer !== undefined && studentAnswer !== null && studentAnswer !== '') {
          const answerIndex = parseInt(studentAnswer, 10);
          
          // Validate answer index is within bounds
          if (!isNaN(answerIndex) && answerIndex >= 0 && question.options && question.options.length > answerIndex) {
            const selectedOption = question.options[answerIndex];
            
            // Check if answer is correct (isCorrect can be boolean)
            if (selectedOption && selectedOption.isCorrect === true) {
              correctAnswers++;
            }
          }
        }
      } catch (err) {
        console.error(`Error processing question ${qIndex}:`, err);
      }
    });

    const score = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
    const passed = score >= exam.passingPercentage;

    // Update progress
    progress.examAttempted = true;
    progress.examScore = score;
    progress.examPassed = passed;
    progress.examAttemptedAt = new Date();

    // Generate certificate if passed
    if (passed) {
      progress.certificateGenerated = true;

      const certificateId = `CERT-${Date.now()}-${req.user.id.toString().slice(-6)}`;

      const certificate = new Certificate({
        student: req.user.id,
        course: courseId,
        exam: exam._id,
        certificateId,
        score,
        issuedDate: new Date(),
      });

      await certificate.save();
    }

    await progress.save();

    res.status(200).json({
      success: true,
      message: passed ? 'Exam passed! Certificate generated.' : 'Exam failed.',
      data: {
        score,
        totalQuestions,
        correctAnswers,
        passingPercentage: exam.passingPercentage,
        passed,
        certificateGenerated: passed,
      },
    });
  } catch (error) {
    console.error('Submit exam error:', error);
    res.status(500).json({ success: false, message: error.message || 'Error submitting exam' });
  }
};

// @desc    Create new exam
// @route   POST /api/exams
// @access  Private/Admin
exports.createExam = async (req, res) => {
  try {
    const { course, title, description, passingPercentage, duration, questions } = req.body;

    const exam = new Exam({
      course,
      title,
      description,
      passingPercentage,
      duration,
      questions,
      totalQuestions: questions.length,
    });

    await exam.save();

    res.status(201).json({ success: true, data: exam });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update exam
// @route   PATCH /api/exams/:examId
// @access  Private/Admin
exports.updateExam = async (req, res) => {
  try {
    const { examId } = req.params;
    const { title, description, passingPercentage, duration, questions } = req.body;

    const exam = await Exam.findByIdAndUpdate(
      examId,
      {
        title,
        description,
        passingPercentage,
        duration,
        questions,
        totalQuestions: questions ? questions.length : undefined,
      },
      { new: true, runValidators: true }
    );

    if (!exam) {
      return res.status(404).json({ success: false, message: 'Exam not found' });
    }

    res.status(200).json({ success: true, data: exam });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete exam
// @route   DELETE /api/exams/:examId
// @access  Private/Admin
exports.deleteExam = async (req, res) => {
  try {
    const { examId } = req.params;

    const exam = await Exam.findByIdAndDelete(examId);

    if (!exam) {
      return res.status(404).json({ success: false, message: 'Exam not found' });
    }

    res.status(200).json({ success: true, message: 'Exam deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get exam results
// @route   GET /api/exams/:courseId/results
// @access  Private/Admin
exports.getExamResults = async (req, res) => {
  try {
    const { courseId } = req.params;

    const results = await Progress.find({
      course: courseId,
      examAttempted: true,
    }).populate('student', 'fullName email');

    res.status(200).json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
