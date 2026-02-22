import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { examAPI, progressAPI } from '../../api';
import LoadingSpinner from '../../components/LoadingSpinner';
import { AlertCircle, Clock, CheckCircle, Play, ArrowLeft } from 'lucide-react';

const ExamStart = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchExamData();
  }, [courseId]);

  const fetchExamData = async () => {
    try {
      setLoading(true);
      const examResponse = await examAPI.getExamByCourse(courseId);
      const progressResponse = await progressAPI.getCourseProgress(courseId);

      if (examResponse.success) {
        setExam(examResponse.data);
      }
      if (progressResponse.success) {
        setProgress(progressResponse.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load exam');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (!exam) {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-white/10 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 text-center shadow-lg shadow-black/5">
          <AlertCircle className="mx-auto h-10 w-10 text-red-500" />
          <div className="mt-3 text-xl font-semibold text-brand-teal dark:text-slate-200">No Exam Available</div>
          <div className="mt-1 text-sm text-brand-teal/70 dark:text-slate-400">This course doesn't have an exam yet.</div>
          <div className="mt-6">
            <button
              onClick={() => navigate(`/student/courses/${courseId}`)}
              className="rounded-lg border border-brand-teal/20 bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 px-4 py-2 text-sm font-semibold text-brand-teal hover:bg-brand-teal/5 dark:hover:bg-slate-700"
            >
              Back to Course
            </button>
          </div>
        </div>
      </div>
    );
  }

  const canTakeExam = progress && progress.progressPercentage === 100 && !progress.examAttempted;

  const handleStartExam = () => {
    navigate(`/student/courses/${courseId}/exam/take`);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {error && (
        <div className="rounded-lg border border-red-300/40 bg-red-500/15 px-4 py-3 text-sm text-red-100">
          <p className="font-semibold">{error}</p>
        </div>
      )}

      <div className="rounded-2xl border border-white/10 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-lg shadow-black/5">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-brand-orange dark:text-slate-100">{exam.title}</h1>
          <p className="text-sm text-brand-teal/70 dark:text-slate-400">{exam.description || 'Final course assessment'}</p>
        </div>

        <div className={`mt-6 rounded-xl border p-4 ${progress?.progressPercentage === 100 ? 'border-brand-orange/30 bg-brand-orange/10' : 'border-brand-teal/20 bg-brand-teal/10'}`}>
          <div className="flex items-center gap-2 text-sm font-semibold text-brand-teal">
            <CheckCircle size={18} />
            Course Completion Status
          </div>
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs font-semibold text-brand-teal/70">
              <span>Progress</span>
              <span className={progress?.progressPercentage === 100 ? 'text-brand-orangeDark' : 'text-brand-teal'}>
                {progress?.progressPercentage || 0}%
              </span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-brand-teal/10">
              <div
                className={`h-full rounded-full ${progress?.progressPercentage === 100 ? 'bg-brand-orange' : 'bg-brand-teal'}`}
                style={{ width: `${progress?.progressPercentage || 0}%` }}
              />
            </div>
          </div>
          {progress?.progressPercentage === 100 && (
            <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-brand-orange/15 px-2 py-1 text-xs font-semibold text-brand-orangeDark">
              <CheckCircle size={14} /> Course 100% completed!
            </div>
          )}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-brand-teal/10 bg-brand-teal/5 p-4">
            <div className="text-xs font-semibold uppercase text-brand-teal/60">📋 Questions</div>
            <div className="mt-2 text-2xl font-bold text-brand-teal">{exam.totalQuestions}</div>
          </div>
          <div className="rounded-lg border border-brand-teal/10 bg-brand-teal/5 p-4">
            <div className="text-xs font-semibold uppercase text-brand-teal/60">✓ Passing Score</div>
            <div className="mt-2 text-2xl font-bold text-brand-orange">{exam.passingPercentage}%</div>
          </div>
          <div className="rounded-lg border border-brand-teal/10 bg-brand-teal/5 p-4">
            <div className="text-xs font-semibold uppercase text-brand-teal/60 flex items-center gap-1"><Clock size={14} /> Duration</div>
            <div className="mt-2 text-2xl font-bold text-brand-teal">{exam.duration}m</div>
          </div>
          <div className="rounded-lg border border-brand-teal/10 bg-brand-teal/5 p-4">
            <div className="text-xs font-semibold uppercase text-brand-teal/60">🎯 Attempts</div>
            <div className="mt-2 text-2xl font-bold text-brand-teal">1</div>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-brand-teal/10 bg-white p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-brand-teal">
            <AlertCircle size={18} /> Important Rules
          </div>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-brand-teal/70">
            <li>You will have {exam.duration} minutes to complete the exam</li>
            <li>Once started, the timer cannot be paused</li>
            <li>You can navigate between questions before submitting</li>
            <li>You have only <strong>1 attempt</strong> - choose your answers carefully</li>
            <li>You need <strong>at least {exam.passingPercentage}%</strong> to pass</li>
            <li>Certificate will be generated only after passing this exam</li>
          </ul>
        </div>

        <div className="mt-6">
          {canTakeExam ? (
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleStartExam}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:bg-brand-orangeDark"
              >
                <Play size={18} /> Start Exam
              </button>
              <button
                onClick={() => navigate(`/student/courses/${courseId}`)}
                className="inline-flex items-center gap-2 rounded-lg border border-brand-teal/20 bg-white px-4 py-2 text-sm font-semibold text-brand-teal hover:bg-brand-teal/5"
              >
                <ArrowLeft size={18} /> Cancel
              </button>
            </div>
          ) : (
            <div className="rounded-lg border border-red-300/40 bg-red-500/15 px-4 py-3 text-sm text-red-100">
              <div className="flex items-center gap-2 font-semibold">
                <AlertCircle size={18} />
                {progress?.examAttempted ? '✗ Exam Already Attempted' : '✗ Course Not Completed'}
              </div>
              <div className="mt-1">
                {progress?.examAttempted
                  ? 'You have already taken this exam. Only one attempt is allowed.'
                  : `Complete all lessons first (${progress?.progressPercentage || 0}% done)`}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamStart;
