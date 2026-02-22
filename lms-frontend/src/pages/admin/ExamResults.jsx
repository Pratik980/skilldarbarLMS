import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { examAPI } from '../../api';
import LoadingSpinner from '../../components/LoadingSpinner';
import { ArrowDown, ArrowUp } from 'lucide-react';

const ExamResults = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [sortBy, setSortBy] = useState('score');

  useEffect(() => {
    fetchResults();
  }, [courseId]);

  const fetchResults = async () => {
    try {
      const response = await examAPI.getExamResults(courseId);
      if (response.success) {
        setResults(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load exam results');
    } finally {
      setLoading(false);
    }
  };

  const sortedResults = [...results].sort((a, b) => {
    let aValue = sortBy === 'score' ? a.examScore : (a.student?.fullName || '');
    let bValue = sortBy === 'score' ? b.examScore : (b.student?.fullName || '');

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
      return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }

    return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
  });

  const passedCount = results.filter((r) => r.examPassed).length;
  const failedCount = results.filter((r) => !r.examPassed).length;
  const avgScore = results.length > 0 ? (results.reduce((sum, r) => sum + r.examScore, 0) / results.length).toFixed(2) : 0;

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1 text-sm font-medium text-brand-teal/70 hover:text-brand-teal transition-colors dark:text-slate-400 dark:hover:text-slate-200"
      >
        ← Back
      </button>

      <div>
        <h1 className="text-3xl font-bold text-brand-orange">
          Exam Results
        </h1>
      </div>

      {error && (
        <div className="rounded-lg bg-red-500/15 border border-red-300/40 text-red-600 px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-xl shadow-lg shadow-black/5 border border-white/10 p-5 text-center">
            <div className="text-xs font-semibold text-brand-teal/60 uppercase tracking-wide mb-1">Total Attempts</div>
            <div className="text-3xl font-bold text-brand-teal">{results.length}</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg shadow-black/5 border border-white/10 p-5 text-center">
            <div className="text-xs font-semibold text-brand-teal/60 uppercase tracking-wide mb-1">Passed</div>
            <div className="text-3xl font-bold text-brand-orangeDark">{passedCount}</div>
            <div className="text-xs text-brand-teal/60 mt-1.5">
              ({((passedCount / results.length) * 100).toFixed(1)}%)
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg shadow-black/5 border border-white/10 p-5 text-center">
            <div className="text-xs font-semibold text-brand-teal/60 uppercase tracking-wide mb-1">Failed</div>
            <div className="text-3xl font-bold text-red-600">{failedCount}</div>
            <div className="text-xs text-brand-teal/60 mt-1.5">
              ({((failedCount / results.length) * 100).toFixed(1)}%)
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg shadow-black/5 border border-white/10 p-5 text-center">
            <div className="text-xs font-semibold text-brand-teal/60 uppercase tracking-wide mb-1">Average Score</div>
            <div className="text-3xl font-bold text-brand-orange">{avgScore}%</div>
          </div>
        </div>
      )}

      {results.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg shadow-black/5 border border-white/10 p-12 text-center">
          <div className="text-xl font-semibold text-brand-teal mb-2">No Exam Attempts</div>
          <div className="text-sm text-brand-teal/70">
            No students have taken this exam yet.
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg shadow-black/5 border border-white/10 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-brand-teal/10">
            <h2 className="text-lg font-bold text-brand-teal">
              Student Results
            </h2>
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-auto min-w-[140px] rounded-lg border border-brand-teal/20 bg-white px-3 py-2 text-sm text-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange"
              >
                <option value="name">Sort by Name</option>
                <option value="score">Sort by Score</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="inline-flex items-center justify-center rounded-lg border border-brand-teal/20 bg-white px-3 py-2 text-brand-teal hover:bg-brand-teal/5 transition-colors whitespace-nowrap"
              >
                {sortOrder === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand-teal/5 border-b border-brand-teal/10">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-brand-teal/70 uppercase tracking-wider">Student Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-brand-teal/70 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-brand-teal/70 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-brand-teal/70 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-brand-teal/70 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-teal/10">
                {sortedResults.map((result) => (
                  <tr key={result._id} className="hover:bg-brand-teal/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-brand-teal whitespace-nowrap">{result.student?.fullName || 'N/A'}</td>
                    <td className="px-6 py-4 text-brand-teal/70 whitespace-nowrap">{result.student?.email || 'N/A'}</td>
                    <td className="px-6 py-4 font-semibold text-brand-teal whitespace-nowrap">{result.examScore}%</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {result.examPassed ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-brand-orange/15 px-3 py-1 text-xs font-semibold text-brand-orangeDark">
                          ✓ Passed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                          ✗ Failed
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-brand-teal/70 whitespace-nowrap">
                      {new Date(result.examAttemptedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamResults;
