import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { examAPI } from '../../api';
import LoadingSpinner from '../../components/LoadingSpinner';
import { X, Plus, Edit2, Check } from 'lucide-react';

const ExamForm = () => {
  const { examId, courseId: courseIdParam } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const courseId = courseIdParam || location.state?.courseId;

  const [loading, setLoading] = useState(examId ? true : false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    course: courseId || '',
    title: '',
    description: '',
    passingPercentage: 60,
    duration: 60,
    questions: [],
  });

  const [newQuestion, setNewQuestion] = useState({
    questionText: '',
    questionImage: '',
    options: [
      { text: '', isCorrect: true },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
    ],
    explanation: '',
  });

  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [editingCorrectOptionIdx, setEditingCorrectOptionIdx] = useState(null);

  useEffect(() => {
    if (examId) {
      fetchExam();
    }
  }, [examId]);

  const fetchExam = async () => {
    try {
      const response = await examAPI.getExamById(examId);
      if (response.success) {
        const exam = response.data;
        setFormData({
          course: exam.course?._id || exam.course || courseId || '',
          title: exam.title,
          description: exam.description,
          passingPercentage: exam.passingPercentage,
          duration: exam.duration,
          questions: exam.questions || [],
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load exam');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'passingPercentage' || name === 'duration' ? parseInt(value) : value,
    });
  };

  const handleQuestionInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion({
      ...newQuestion,
      [name]: value,
    });
  };

  const handleOptionChange = (idx, text) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[idx].text = text;
    setNewQuestion({
      ...newQuestion,
      options: updatedOptions,
    });
  };

  const handleCorrectOptionChange = (idx) => {
    const updatedOptions = newQuestion.options.map((opt, i) => ({
      ...opt,
      isCorrect: i === idx,
    }));
    setNewQuestion({
      ...newQuestion,
      options: updatedOptions,
    });
  };

  const addQuestion = () => {
    if (!newQuestion.questionText.trim()) {
      setError('Question text is required');
      return;
    }

    if (newQuestion.options.some((opt) => !opt.text.trim())) {
      setError('All options must have text');
      return;
    }

    setFormData({
      ...formData,
      questions: [...formData.questions, { ...newQuestion, _id: Date.now() }],
    });

    setNewQuestion({
      questionText: '',
      questionImage: '',
      options: [
        { text: '', isCorrect: true },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
      ],
      explanation: '',
    });

    setError('');
  };

  const removeQuestion = (index) => {
    setFormData({
      ...formData,
      questions: formData.questions.filter((_, i) => i !== index),
    });
    setEditingQuestionId(null);
    setEditingCorrectOptionIdx(null);
  };

  const startEditQuestion = (questionId, currentCorrectIdx) => {
    setEditingQuestionId(questionId);
    setEditingCorrectOptionIdx(currentCorrectIdx);
  };

  const saveCorrectOption = (questionId, newCorrectIdx) => {
    setFormData({
      ...formData,
      questions: formData.questions.map((q) => {
        if (q._id === questionId) {
          return {
            ...q,
            options: q.options.map((opt, idx) => ({
              ...opt,
              isCorrect: idx === newCorrectIdx,
            })),
          };
        }
        return q;
      }),
    });
    setEditingQuestionId(null);
    setEditingCorrectOptionIdx(null);
  };

  const cancelEditQuestion = () => {
    setEditingQuestionId(null);
    setEditingCorrectOptionIdx(null);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.course || !formData.title.trim()) {
      setError('Course and title are required');
      return;
    }

    if (formData.questions.length === 0) {
      setError('At least one question is required');
      return;
    }

    try {
      setSubmitting(true);
      const submitData = {
        ...formData,
        questions: formData.questions.map(({ _id, ...rest }) => rest),
      };

      if (examId) {
        await examAPI.updateExam(examId, submitData);
      } else {
        await examAPI.createExam(submitData);
      }

      navigate(`/admin/courses/${submitData.course}/exam`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save exam');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1 text-sm font-medium text-brand-teal/70 hover:text-brand-teal transition-colors dark:text-slate-400 dark:hover:text-slate-200"
      >
        ← Back
      </button>

      <div className="rounded-xl border border-white/10 bg-white p-6 shadow-lg shadow-black/5">
        <div className="border-b border-brand-teal/10 pb-4">
          <h1 className="text-2xl font-bold text-brand-orange">{examId ? 'Edit' : 'Create'} Exam</h1>
        </div>

        <div className="pt-4">
          {error && (
            <div className="mb-4 rounded-lg border border-red-300/40 bg-red-500/15 px-4 py-3 text-sm text-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-brand-teal">Exam Details</h2>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-brand-teal">Exam Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., JavaScript Final Exam"
                  className="w-full rounded-lg border border-brand-teal/20 bg-white px-3 py-2 text-sm text-brand-teal focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-brand-teal">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the exam..."
                  className="w-full rounded-lg border border-brand-teal/20 bg-white px-3 py-2 text-sm text-brand-teal focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30"
                  rows="4"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-brand-teal">Passing Percentage (%)</label>
                  <input
                    type="number"
                    name="passingPercentage"
                    value={formData.passingPercentage}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    className="w-full rounded-lg border border-brand-teal/20 bg-white px-3 py-2 text-sm text-brand-teal focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-brand-teal">Duration (minutes)</label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full rounded-lg border border-brand-teal/20 bg-white px-3 py-2 text-sm text-brand-teal focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-brand-teal">Questions</h2>
                <span className="rounded-full bg-brand-teal/10 px-2 py-0.5 text-xs font-semibold text-brand-teal/80">{formData.questions.length}</span>
              </div>

              {formData.questions.length > 0 && (
                <div className="space-y-3">
                  {formData.questions.map((q, idx) => (
                    <div key={q._id || idx} className="rounded-lg border border-brand-teal/10 bg-brand-teal/5 p-4">
                      {editingQuestionId === q._id ? (
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <div>
                              <span className="text-xs font-semibold uppercase text-brand-teal/60">Question {idx + 1}</span>
                              <div className="text-sm font-semibold text-brand-teal">{q.questionText}</div>
                            </div>
                          </div>
                          
                          <div className="mt-4 border-t border-brand-teal/10 pt-4">
                            <div className="mb-3 text-sm font-semibold text-brand-teal">
                              Select Correct Answer:
                            </div>
                            <div className="flex flex-col gap-2">
                              {q.options.map((opt, optIdx) => (
                                <label key={optIdx} className="flex items-center gap-2 text-sm text-brand-teal/80">
                                  <input
                                    type="radio"
                                    name={`correct-${q._id}`}
                                    checked={editingCorrectOptionIdx === optIdx}
                                    onChange={() => setEditingCorrectOptionIdx(optIdx)}
                                    className="text-brand-orange focus:ring-brand-orange/30"
                                  />
                                  <span>
                                    Option {String.fromCharCode(65 + optIdx)}: {opt.text}
                                  </span>
                                  {editingCorrectOptionIdx === optIdx && (
                                    <span className="ml-auto rounded bg-brand-orange/15 px-2 py-0.5 text-xs font-semibold text-brand-orangeDark">
                                      ✓ Correct
                                    </span>
                                  )}
                                </label>
                              ))}
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() => saveCorrectOption(q._id, editingCorrectOptionIdx)}
                                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:bg-brand-orangeDark"
                              >
                                <Check size={16} />
                                Save
                              </button>
                              <button
                                type="button"
                                onClick={cancelEditQuestion}
                                className="inline-flex flex-1 items-center justify-center rounded-lg border border-brand-teal/20 bg-white px-4 py-2 text-sm font-semibold text-brand-teal hover:bg-brand-teal/5"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <span className="text-xs font-semibold uppercase text-brand-teal/60">Question {idx + 1}</span>
                              <div className="text-sm font-semibold text-brand-teal">{q.questionText}</div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => startEditQuestion(q._id, q.options.findIndex((o) => o.isCorrect))}
                                className="rounded-lg bg-brand-teal/10 p-2 text-brand-teal"
                                title="Edit question"
                              >
                                <Edit2 className="h-5 w-5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => removeQuestion(idx)}
                                className="rounded-lg bg-red-100 p-2 text-red-700"
                                title="Delete question"
                              >
                                <X className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                          <div className="mt-2 flex items-center gap-2 text-sm text-brand-teal/70">
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orangeDark">✓</span>
                            {q.options.find((o) => o.isCorrect)?.text}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="rounded-xl border border-brand-teal/10 bg-white p-5">
                <h3 className="flex items-center gap-2 text-base font-semibold text-brand-teal">
                  <Plus className="h-4 w-4" />
                  Add New Question
                </h3>

                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-brand-teal">Question Text</label>
                    <textarea
                      name="questionText"
                      value={newQuestion.questionText}
                      onChange={handleQuestionInputChange}
                      placeholder="Enter your question here..."
                      className="w-full rounded-lg border border-brand-teal/20 bg-white px-3 py-2 text-sm text-brand-teal focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30"
                      rows="3"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-brand-teal">
                      Options (Click to mark the correct answer)
                    </label>
                    <div className="space-y-2">
                      {newQuestion.options.map((opt, idx) => (
                        <div 
                          key={idx} 
                          className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-sm ${opt.isCorrect ? 'border-brand-orange bg-brand-orange/10' : 'border-brand-teal/10 bg-white'}`}
                          onClick={() => handleCorrectOptionChange(idx)}
                        >
                          <input
                            type="radio"
                            name="correct"
                            checked={opt.isCorrect}
                            onChange={() => handleCorrectOptionChange(idx)}
                            className="text-brand-orange focus:ring-brand-orange/30"
                          />
                          <span className={`flex h-8 w-8 items-center justify-center rounded-md text-sm font-bold ${opt.isCorrect ? 'bg-brand-orange text-white' : 'bg-brand-teal/10 text-brand-teal'}`}>
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <input
                            type="text"
                            value={opt.text}
                            onChange={(e) => handleOptionChange(idx, e.target.value)}
                            placeholder={`Enter option ${String.fromCharCode(65 + idx)} text...`}
                            className="flex-1 rounded-lg border border-brand-teal/20 bg-white px-3 py-2 text-sm text-brand-teal focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30"
                            onClick={(e) => e.stopPropagation()}
                          />
                          {opt.isCorrect && (
                            <span className="rounded bg-brand-orange/15 px-2 py-0.5 text-xs font-semibold text-brand-orangeDark">✓ Correct</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-brand-teal">Explanation</label>
                    <textarea
                      name="explanation"
                      value={newQuestion.explanation}
                      onChange={handleQuestionInputChange}
                      placeholder="Explain why this is the correct answer..."
                      className="w-full rounded-lg border border-brand-teal/20 bg-white px-3 py-2 text-sm text-brand-teal focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30"
                      rows="3"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={addQuestion}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:bg-brand-orangeDark"
                  >
                    <Plus size={16} />
                    Add Question
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="submit"
                disabled={submitting}
                className="rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:bg-brand-orangeDark disabled:opacity-60"
              >
                {submitting ? 'Saving...' : 'Save Exam'}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="rounded-lg border border-brand-teal/20 bg-white px-4 py-2 text-sm font-semibold text-brand-teal hover:bg-brand-teal/5"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExamForm;
