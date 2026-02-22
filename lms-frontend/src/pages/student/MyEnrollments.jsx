import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { enrollmentsAPI } from '../../api/enrollments';
import { progressAPI } from '../../api/progress';
import LoadingSpinner from '../../components/LoadingSpinner';
import { getImageUrl } from '../../utils/imageUrl';
import SafeImage from '../../components/SafeImage';
import StatusBadge from '../../components/StatusBadge';
import { certificateAPI, examAPI } from '../../api';
import { Award, CheckCircle, Lock, FileText } from 'lucide-react';

const MyEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [progressData, setProgressData] = useState({});
  const [examData, setExamData] = useState({});
  const [certificateData, setCertificateData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const response = await enrollmentsAPI.getMyEnrollments();
      const enrollmentData = (response.data || []).filter(e => e.course != null);
      setEnrollments(enrollmentData);
      
      const approved = enrollmentData.filter((e) => e.status === 'approved' && e.course?._id);
      await Promise.all(approved.map((e) => fetchProgress(e.course._id)));
      await Promise.all(approved.map((e) => fetchExam(e.course._id)));
    } catch (err) {
      console.error('Failed to load enrollments:', err);
      setError('Failed to load enrollments');
    } finally {
      setLoading(false);
    }
  };

  const fetchProgress = async (courseId) => {
    try {
      const response = await progressAPI.getCourseProgress(courseId);
      setProgressData(prev => ({
        ...prev,
        [courseId]: response.data
      }));
    } catch (err) {
      // Progress may not exist yet, that's okay
      setProgressData(prev => ({
        ...prev,
        [courseId]: { progressPercentage: 0, examAttempted: false, examPassed: false }
      }));
    }
  };

  const fetchExam = async (courseId) => {
    try {
      const res = await examAPI.getExamByCourse(courseId);
      if (res.success) {
        setExamData((prev) => ({ ...prev, [courseId]: res.data }));
      }
    } catch (err) {
      // No exam is valid (404) — we just hide exam actions
      setExamData((prev) => ({ ...prev, [courseId]: null }));
    }
  };

  const fetchCertificate = async (courseId) => {
    try {
      const res = await certificateAPI.getCertificate(courseId);
      if (res.success) {
        setCertificateData((prev) => ({ ...prev, [courseId]: res.data }));
      }
    } catch (err) {
      setCertificateData((prev) => ({ ...prev, [courseId]: null }));
    }
  };

  // Fetch certificates for passed exams (moved out of render body to prevent infinite loop)
  useEffect(() => {
    enrollments.forEach((enrollment) => {
      const courseId = enrollment.course?._id;
      if (!courseId) return;
      const progress = progressData[courseId];
      if (progress?.examPassed && certificateData[courseId] === undefined) {
        fetchCertificate(courseId);
      }
    });
  }, [progressData, enrollments]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <h2 className="text-2xl font-bold text-brand-orange">My Enrollments</h2>

      {error && (
        <div className="rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      {enrollments.length === 0 ? (
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 text-center shadow-sm">
          <p className="text-sm text-slate-600 dark:text-slate-400">You haven't enrolled in any courses yet.</p>
          <Link to="/student/courses" className="mt-3 inline-flex rounded-lg bg-slate-900 dark:bg-slate-700 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 dark:hover:bg-slate-600">
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {enrollments.map(enrollment => {
            const courseId = enrollment.course?._id;
            const progress = progressData[courseId] || { progressPercentage: 0, examAttempted: false, examPassed: false };
            const exam = examData[courseId];
            const hasExam = !!exam;
            const canTakeExam = hasExam && progress.progressPercentage === 100 && !progress.examAttempted;
            const certificate = certificateData[courseId];
            
            return (
              <div key={enrollment._id} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-200">{enrollment.course?.name}</h3>
                  <StatusBadge status={enrollment.status} />
                </div>

                <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                  <p><strong className="text-slate-700 dark:text-slate-300">Enrolled:</strong> {new Date(enrollment.enrolledAt).toLocaleDateString()}</p>
                  <p><strong className="text-slate-700 dark:text-slate-300">Amount:</strong> NPR {enrollment.amount}</p>
                  {enrollment.approvedAt && (
                    <p><strong className="text-slate-700 dark:text-slate-300">Approved:</strong> {new Date(enrollment.approvedAt).toLocaleDateString()}</p>
                  )}
                </div>

                {enrollment.status === 'approved' && (
                  <>
                    <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 p-3">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
                        <span>Course Progress</span>
                        <span>{progress.progressPercentage}%</span>
                      </div>
                      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-600">
                        <div 
                          className="h-full rounded-full bg-blue-600"
                          style={{ width: `${progress.progressPercentage}%` }}
                        ></div>
                      </div>
                      {progress.progressPercentage === 100 && (
                        <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
                          <CheckCircle size={14} /> Course Completed!
                        </div>
                      )}
                    </div>

                    <div className="rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700">
                      <div className="flex items-start gap-2">
                        {progress.progressPercentage < 100 ? (
                          <>
                            <Lock size={18} />
                            <div>
                              <strong>Exam Locked</strong>
                              <p className="text-xs text-slate-500">Complete all lessons to unlock the final exam</p>
                            </div>
                          </>
                        ) : !hasExam ? (
                          <>
                            <FileText size={18} />
                            <div>
                              <strong>No Exam Yet</strong>
                              <p className="text-xs text-slate-500">The admin hasn’t added an exam for this course</p>
                            </div>
                          </>
                        ) : progress.examAttempted ? (
                          <>
                            <FileText size={18} />
                            <div>
                              <strong>Exam Attempted</strong>
                              <p className="text-xs text-slate-500">{progress.examPassed ? 'Passed ✅' : 'Failed ❌'} (one attempt only)</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <FileText size={18} />
                            <div>
                              <strong>Exam Unlocked</strong>
                              <p className="text-xs text-slate-500">Ready to take the final exam (one attempt only)</p>
                            </div>
                          </>
                        )}
                      </div>

                      {canTakeExam && (
                        <Link to={`/student/courses/${courseId}/exam`} className="mt-3 inline-flex rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600">
                          Start Exam
                        </Link>
                      )}

                      {progress.examPassed && (
                        <div className="mt-3 flex flex-wrap items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2">
                          <Award size={18} className="text-emerald-700" />
                          <div className="text-xs text-emerald-700">
                            <strong>Certificate Unlocked</strong>
                            <div>{certificate?.certificateId ? `ID: ${certificate.certificateId}` : 'Available in Certificates page'}</div>
                          </div>
                          <Link to="/student/certificates" className="ml-auto rounded-lg border border-emerald-200 bg-white px-2 py-1 text-xs font-semibold text-emerald-700">
                            View
                          </Link>
                          <button
                            className="rounded-lg border border-emerald-200 bg-white px-2 py-1 text-xs font-semibold text-emerald-700"
                            onClick={async () => {
                              try {
                                const response = await certificateAPI.downloadCertificate(courseId);
                                const url = window.URL.createObjectURL(new Blob([response.data]));
                                const link = document.createElement('a');
                                link.href = url;
                                link.setAttribute('download', `certificate-${courseId}.pdf`);
                                document.body.appendChild(link);
                                link.click();
                                link.parentNode.removeChild(link);
                                window.URL.revokeObjectURL(url);
                              } catch (e) {
                                setError('Failed to download certificate');
                              }
                            }}
                          >
                            Download
                          </button>
                        </div>
                      )}
                    </div>

                    <Link 
                      to={`/student/courses/${courseId}`}
                      className="inline-flex rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600"
                    >
                      Continue Learning
                    </Link>
                  </>
                )}

                {enrollment.status === 'pending' && (
                  <div className="rounded-lg border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-900/20 p-3 text-sm text-amber-700 dark:text-amber-400">
                    <p className="font-semibold">Waiting for payment confirmation</p>
                    <SafeImage 
                      src={getImageUrl(enrollment.course?.qrImage)}
                      alt="QR"
                      className="mt-2 w-24 rounded border border-amber-200 dark:border-amber-800"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyEnrollments;