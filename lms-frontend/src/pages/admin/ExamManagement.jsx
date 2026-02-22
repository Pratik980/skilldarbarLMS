import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { examAPI, coursesAPI } from '../../api';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Plus, Edit2, Trash2, Eye, BarChart3 } from 'lucide-react';

const ExamManagement = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchData();
  }, [courseId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const examResponse = await examAPI.getExamByCourse(courseId);
      const courseResponse = await coursesAPI.getCourseById(courseId);

      if (examResponse.success) {
        setExam(examResponse.data);
      }
      if (courseResponse.success) {
        setCourse(courseResponse.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExam = async () => {
    if (!exam) return;

    if (!window.confirm('Are you sure you want to delete this exam?')) {
      return;
    }

    try {
      setDeleting(true);
      await examAPI.deleteExam(exam._id);
      navigate('/admin/courses');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete exam');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1 text-sm font-medium text-brand-teal/70 hover:text-brand-teal transition-colors dark:text-slate-400 dark:hover:text-slate-200"
      >
        ← Back
      </button>

      {error && (
        <div className="rounded-lg border border-red-300/40 bg-red-500/15 px-4 py-3 text-sm text-red-100">
          {error}
        </div>
      )}

      {!exam ? (
        <div className="rounded-xl border border-white/10 bg-white p-10 text-center shadow-lg shadow-black/5">
          <div className="text-xl font-semibold text-brand-teal">No Exam Available</div>
          <div className="mt-2 text-sm text-brand-teal/70">
            No exam has been created for this course yet.
          </div>
          <button
            onClick={() => navigate(`/admin/exams/create/${courseId}`, { state: { courseId } })}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:bg-brand-orangeDark"
          >
            <Plus size={16} />
            Create Exam
          </button>
        </div>
      ) : (
        <div className="rounded-xl border border-white/10 bg-white p-6 shadow-lg shadow-black/5">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-brand-orange">{exam.title}</h1>
            <p className="text-sm text-brand-teal/70">{exam.description}</p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-brand-teal/10 bg-brand-teal/5 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-brand-teal/60">Questions</div>
              <div className="mt-2 text-2xl font-bold text-brand-orange">{exam.totalQuestions}</div>
            </div>
            <div className="rounded-lg border border-brand-teal/10 bg-brand-teal/5 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-brand-teal/60">Passing %</div>
              <div className="mt-2 text-2xl font-bold text-brand-orange">{exam.passingPercentage}%</div>
            </div>
            <div className="rounded-lg border border-brand-teal/10 bg-brand-teal/5 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-brand-teal/60">Duration</div>
              <div className="mt-2 text-2xl font-bold text-brand-orange">{exam.duration} min</div>
            </div>
            <div className="rounded-lg border border-brand-teal/10 bg-brand-teal/5 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-brand-teal/60">Max Attempts</div>
              <div className="mt-2 text-2xl font-bold text-brand-orange">1</div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-brand-teal">Questions</h3>
            <div className="mt-3 space-y-3">
              {exam.questions.slice(0, 5).map((q, idx) => (
                <div key={q._id || idx} className="rounded-lg border border-brand-teal/10 bg-white p-4">
                  <div className="text-sm font-semibold text-brand-teal">
                    Q{idx + 1}: {q.questionText}
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-sm text-brand-teal/70">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orangeDark">✓</span>
                    {q.options.find((o) => o.isCorrect)?.text}
                  </div>
                </div>
              ))}
              {exam.questions.length > 5 && (
                <p className="text-sm text-brand-teal/60">
                  ... and {exam.questions.length - 5} more questions
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => navigate(`/admin/exams/${exam._id}/edit`, { state: { courseId } })}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:bg-brand-orangeDark"
            >
              <Edit2 size={16} />
              Edit Exam
            </button>
            <button
              onClick={() => navigate(`/admin/courses/${courseId}/exam-results`)}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-teal px-4 py-2 text-sm font-semibold text-white hover:bg-brand-teal/90"
            >
              <BarChart3 size={16} />
              View Results
            </button>
            <button
              onClick={handleDeleteExam}
              disabled={deleting}
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamManagement;
