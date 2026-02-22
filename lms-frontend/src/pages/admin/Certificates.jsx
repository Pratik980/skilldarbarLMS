import { useEffect, useState } from 'react';
import { progressAPI } from '../../api/progress';
import LoadingSpinner from '../../components/LoadingSpinner';

const Certificates = () => {
  const [progressList, setProgressList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const response = await progressAPI.getAllProgress();
      setProgressList(response.data || []);
    } catch (err) {
      setError('Failed to load progress records');
    } finally {
      setLoading(false);
    }
  };

  const handleSendCertificate = async (progressId) => {
    try {
      const response = await progressAPI.sendCertificate(progressId);
      if (response.success) {
        fetchProgress();
      }
    } catch (err) {
      setError('Failed to send certificate');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-brand-orange">Certificates</h2>
      </div>

      {error && (
        <div className="rounded-lg border border-red-300/40 bg-red-500/15 px-4 py-3 text-sm text-red-100">
          {error}
        </div>
      )}

      <div className="rounded-xl border border-white/10 bg-white shadow-lg shadow-black/5">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-teal/10 bg-brand-teal/5 text-left text-xs font-semibold uppercase tracking-wider text-brand-teal/70">
                <th className="px-4 py-3">Student</th>
                <th className="px-4 py-3">Course</th>
                <th className="px-4 py-3">Progress</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-teal/10">
              {progressList.map((progress) => (
                <tr key={progress._id} className="hover:bg-brand-teal/5">
                  <td className="px-4 py-3">
                    <div className="font-medium text-brand-teal">{progress.student?.fullName}</div>
                    <div className="text-xs text-brand-teal/70">{progress.student?.email}</div>
                  </td>
                  <td className="px-4 py-3 text-brand-teal/70">{progress.course?.name}</td>
                  <td className="px-4 py-3 text-brand-teal/70">{progress.progressPercentage}%</td>
                  <td className="px-4 py-3 text-brand-teal/70">{progress.certificateSent ? 'Sent' : 'Pending'}</td>
                  <td className="px-4 py-3">
                    {progress.certificateSent ? (
                      <span className="rounded-full bg-brand-orange/15 px-2 py-1 text-xs font-semibold text-brand-orangeDark">Sent</span>
                    ) : (
                      <button
                        className="rounded-lg bg-brand-orange px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-orangeDark"
                        onClick={() => handleSendCertificate(progress._id)}
                      >
                        Mark as Sent
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {progressList.length === 0 && (
        <p className="text-sm text-white/70">No progress records found</p>
      )}
    </div>
  );
};

export default Certificates;
