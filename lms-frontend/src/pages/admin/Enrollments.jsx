import { useState, useEffect } from 'react';
import { enrollmentsAPI } from '../../api/enrollments';
import { progressAPI } from '../../api/progress';
import LoadingSpinner from '../../components/LoadingSpinner';
import StatusBadge from '../../components/StatusBadge';
import { Award, Send } from 'lucide-react';
import { getImageUrl } from '../../utils/imageUrl';
import SafeImage from '../../components/SafeImage';
import toast from 'react-hot-toast';

const Enrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [progressDataMap, setProgressDataMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);

  useEffect(() => {
    fetchEnrollments();
  }, [filter]);

  const fetchEnrollments = async () => {
    try {
      const response = await enrollmentsAPI.getAllEnrollments(filter);
      const enrollmentData = (response.data || []).filter(e => e.course != null);
      setEnrollments(enrollmentData);
      
      // Fetch all progress data
      const progressResponse = await progressAPI.getAllProgress();
      const progressMap = {};
      (progressResponse.data || []).forEach(prog => {
        if (prog.student?._id && prog.course?._id) {
          const key = `${prog.student._id}_${prog.course._id}`;
          progressMap[key] = prog;
        }
      });
      setProgressDataMap(progressMap);
    } catch (err) {
      setError('Failed to load enrollments');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const response = await enrollmentsAPI.approveEnrollment(id);
      if (response.success) {
        toast.success('Enrollment approved');
        fetchEnrollments(); // Refresh list
      }
    } catch (err) {
      console.error('Error approving enrollment:', err);
      const errorMsg = err.response?.data?.message || 'Failed to approve enrollment';
      toast.error(errorMsg);
      setError(errorMsg);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await enrollmentsAPI.rejectEnrollment(id);
      if (response.success) {
        toast.success('Enrollment rejected');
        fetchEnrollments(); // Refresh list
      }
    } catch (err) {
      console.error('Error rejecting enrollment:', err);
      const errorMsg = err.response?.data?.message || 'Failed to reject enrollment';
      toast.error(errorMsg);
      setError(errorMsg);
    }
  };

  const handleSendCertificate = async (progressId) => {
    try {
      const response = await progressAPI.sendCertificate(progressId);
      if (response.success) {
        fetchEnrollments(); // Refresh list
        alert('Certificate marked as sent successfully!');
      }
    } catch (err) {
      console.error('Error sending certificate:', err);
      const errorMsg = err.response?.data?.message || 'Failed to send certificate';
      setError(errorMsg);
    }
  };

  const getProgressForEnrollment = (enrollment) => {
    const key = `${enrollment.student?._id}_${enrollment.course?._id}`;
    return progressDataMap[key] || null;
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-brand-orange">Manage Enrollments</h2>
      </div>

      {error && (
        <div className="rounded-lg border border-red-300/40 bg-red-500/15 px-4 py-3 text-sm text-red-100">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-8">
        <div className="flex flex-col gap-3">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-600">Filter by Status</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-lg border border-brand-teal/20 bg-white px-4 py-3 text-sm text-brand-teal focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white shadow-lg shadow-black/5">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-teal/10 bg-brand-teal/5 text-left text-xs font-semibold uppercase tracking-wider text-brand-teal/70">
                <th className="px-4 py-3">Student</th>
                <th className="px-4 py-3">Course</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Enrolled</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Progress</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-teal/10">
              {enrollments.map(enrollment => {
                const progress = getProgressForEnrollment(enrollment);
                const isEligibleForCert = progress && progress.progressPercentage >= 80;
                
                return (
                  <tr key={enrollment._id} className="hover:bg-brand-teal/5">
                    <td className="px-4 py-3">
                      <div className="font-medium text-brand-teal">{enrollment.student?.fullName}</div>
                      <div className="text-xs text-brand-teal/70">{enrollment.student?.email}</div>
                    </td>
                    <td className="px-4 py-3 text-brand-teal/70">{enrollment.course?.name}</td>
                    <td className="px-4 py-3 text-brand-teal/70">NPR {enrollment.amount}</td>
                    <td className="px-4 py-3 text-brand-teal/70">{new Date(enrollment.enrolledAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={enrollment.status} />
                    </td>
                    <td className="px-4 py-3">
                      {enrollment.status === 'approved' && progress ? (
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-28 overflow-hidden rounded-full bg-brand-teal/10">
                            <div 
                              className="h-full rounded-full bg-brand-orange"
                              style={{ width: `${progress.progressPercentage}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-semibold text-brand-teal/80">{progress.progressPercentage}%</span>
                          {isEligibleForCert && (
                            <div>
                              {progress.certificateSent ? (
                                <span className="rounded-full bg-brand-orange/15 px-2 py-1 text-xs font-semibold text-brand-orangeDark">✓ Sent</span>
                              ) : (
                                <button
                                  onClick={() => handleSendCertificate(progress._id)}
                                  className="inline-flex items-center rounded-full bg-brand-orange/15 p-1.5 text-brand-orangeDark"
                                  title="Send Certificate"
                                >
                                  <Send size={14} />
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-brand-teal/40">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setSelectedEnrollment(enrollment)}
                          className="rounded-lg border border-brand-teal/20 bg-white px-3 py-1.5 text-xs font-semibold text-brand-teal hover:bg-brand-teal/5"
                        >
                          View Details
                        </button>
                        {enrollment.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(enrollment._id)}
                              className="rounded-lg bg-brand-orange/15 px-3 py-1.5 text-xs font-semibold text-brand-orangeDark"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(enrollment._id)}
                              className="rounded-lg bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-700"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {enrollments.length === 0 && (
        <p className="text-sm text-white/70">No enrollments found</p>
      )}

      {selectedEnrollment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={() => setSelectedEnrollment(null)}>
          <div className="w-full max-w-2xl rounded-xl border border-brand-teal/10 bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-brand-teal">Enrollment Details</h3>
            
            <div className="mt-4 space-y-3 text-sm text-brand-teal/70">
              <div className="flex justify-between gap-4">
                <span className="font-semibold">Student Name (Profile):</span>
                <span>{selectedEnrollment.student?.fullName}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="font-semibold">Enrollment Name (Payment):</span>
                <span>{selectedEnrollment.enrollmentName}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="font-semibold">Email:</span>
                <span>{selectedEnrollment.enrollmentEmail}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="font-semibold">Phone:</span>
                <span>{selectedEnrollment.enrollmentPhone}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="font-semibold">Course:</span>
                <span>{selectedEnrollment.course?.name}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="font-semibold">Amount:</span>
                <span>NPR {selectedEnrollment.amount}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="font-semibold">Status:</span>
                <StatusBadge status={selectedEnrollment.status} />
              </div>
              <div className="flex justify-between gap-4">
                <span className="font-semibold">Enrolled At:</span>
                <span>{new Date(selectedEnrollment.enrolledAt).toLocaleString()}</span>
              </div>
              
              <div className="pt-2">
                <span className="font-semibold">Payment Proof:</span>
                <div className="mt-3 overflow-hidden rounded-lg border border-brand-teal/10">
                  <SafeImage 
                    src={getImageUrl(selectedEnrollment.paymentProof)} 
                    alt="Payment Proof"
                    className="max-h-[420px] w-full object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {selectedEnrollment.status === 'pending' && (
                <>
                  <button
                    onClick={() => {
                      handleApprove(selectedEnrollment._id);
                      setSelectedEnrollment(null);
                    }}
                    className="rounded-lg bg-brand-orange/15 px-4 py-2 text-sm font-semibold text-brand-orangeDark"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      handleReject(selectedEnrollment._id);
                      setSelectedEnrollment(null);
                    }}
                    className="rounded-lg bg-red-100 px-4 py-2 text-sm font-semibold text-red-700"
                  >
                    Reject
                  </button>
                </>
              )}
              <button onClick={() => setSelectedEnrollment(null)} className="rounded-lg border border-brand-teal/20 bg-white px-4 py-2 text-sm font-semibold text-brand-teal hover:bg-brand-teal/5">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Enrollments;