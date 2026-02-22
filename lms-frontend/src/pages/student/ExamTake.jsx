import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { examAPI } from '../../api';
import LoadingSpinner from '../../components/LoadingSpinner';
import { AlertCircle, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const ExamTake = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null);
  const submitRef = useRef(null);

  useEffect(() => {
    fetchExam();
  }, [courseId]);

  const fetchExam = async () => {
    try {
      const response = await examAPI.getExamForTaking(courseId);
      if (response.success) {
        setExam(response.data);
        setTimeLeft(response.data.duration * 60);
        setAnswers({});
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load exam');
      if (err.response?.status === 403) {
        setTimeout(() => navigate(`/student/courses/${courseId}/exam`), 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  // Timer effect - runs once when exam loads
  useEffect(() => {
    if (!exam) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          submitRef.current?.(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [exam]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (optionIndex) => {
    const question = exam.questions[currentQuestionIndex];
    setAnswers({
      ...answers,
      [question._id]: optionIndex,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleJumpToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleSubmitExam = async (autoSubmit = false) => {
    if (!autoSubmit) {
      const confirmed = window.confirm('Are you sure you want to submit the exam? This action cannot be undone.');
      if (!confirmed) return;
    }

    try {
      setSubmitting(true);
      const response = await examAPI.submitExam(courseId, answers);

      if (response.success) {
        navigate(`/student/courses/${courseId}/exam/result`, {
          state: { result: response.data },
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit exam');
    } finally {
      setSubmitting(false);
    }
  };

  // Keep submit ref up to date so timer closure accesses latest answers
  submitRef.current = handleSubmitExam;

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="mx-auto max-w-md">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <AlertCircle className="mx-auto h-8 w-8 text-red-600" />
          <div className="mt-3 text-lg font-semibold text-red-700">Error</div>
          <div className="mt-1 text-sm text-red-700">{error}</div>
          <div className="mt-4">
            <button
              onClick={() => navigate(`/student/courses/${courseId}/exam`)}
              className="w-full rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = exam.questions[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;
  const timeMinutes = Math.floor(timeLeft / 60);
  const timeSeconds = timeLeft % 60;
  const isTimeLow = timeLeft < 300; // Less than 5 minutes
  const isTimeCritical = timeLeft < 60; // Less than 1 minute

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-800">{exam.title}</h1>
            <p className="text-sm text-slate-500">Question {currentQuestionIndex + 1} of {exam.questions.length}</p>
          </div>
          <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${isTimeCritical ? 'bg-red-50 text-red-700' : isTimeLow ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-700'}`}>
            <Clock size={18} />
            <span>{timeMinutes}:{timeSeconds.toString().padStart(2, '0')}</span>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
            <span>Progress</span>
            <span>{answeredCount}/{exam.questions.length} answered</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-blue-600"
              style={{ width: `${(answeredCount / exam.questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Question {currentQuestionIndex + 1}</div>
          <h2 className="text-lg font-semibold text-slate-800">{currentQuestion.questionText}</h2>

          {currentQuestion.questionImage && (
            <img
              src={currentQuestion.questionImage}
              alt="Question"
              className="w-full rounded-xl border border-slate-200"
            />
          )}

          <div className="space-y-2">
            {currentQuestion.options.map((option, index) => (
              <label
                key={index}
                className={`flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2 text-sm ${answers[currentQuestion._id] === index ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-700'}`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion._id}`}
                  value={index}
                  checked={answers[currentQuestion._id] === index}
                  onChange={() => handleAnswerSelect(index)}
                  className="mt-1 text-blue-600 focus:ring-blue-500"
                />
                <span>{option.text}</span>
              </label>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              <ChevronLeft size={16} /> Previous
            </button>

            <button
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === exam.questions.length - 1}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Next <ChevronRight size={16} />
            </button>

            <button
              onClick={() => handleSubmitExam(false)}
              disabled={submitting || answeredCount !== exam.questions.length}
              className="ml-auto inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Exam'}
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-800">Questions</h3>
          <div className="mt-3 grid grid-cols-5 gap-2">
            {exam.questions.map((_, index) => {
              const stateClass = index === currentQuestionIndex
                ? 'bg-blue-600 text-white'
                : answers[exam.questions[index]._id] !== undefined
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-100 text-slate-600';
              return (
                <button
                  key={index}
                  onClick={() => handleJumpToQuestion(index)}
                  className={`h-9 w-9 rounded-lg text-xs font-semibold ${stateClass}`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>

          <div className="mt-4 space-y-2 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full border border-slate-300 bg-slate-100"></span>
              Not answered
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
              Answered
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-blue-600"></span>
              Current
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamTake;
