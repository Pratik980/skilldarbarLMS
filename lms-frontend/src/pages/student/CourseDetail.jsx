import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { coursesAPI } from '../../api/courses';
import { enrollmentsAPI } from '../../api/enrollments';
import { contentAPI } from '../../api/content';
import { progressAPI } from '../../api/progress';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import StatusBadge from '../../components/StatusBadge';
import ReviewSection from '../../components/ReviewSection';
import { getImageUrl } from '../../utils/imageUrl';
import SafeImage from '../../components/SafeImage';
import toast from 'react-hot-toast';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [content, setContent] = useState([]);
  const [enrollment, setEnrollment] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showEnrollForm, setShowEnrollForm] = useState(false);
  const [enrollmentData, setEnrollmentData] = useState({
    enrollmentName: '',
    enrollmentEmail: user?.email || '',
    enrollmentPhone: user?.phone || '',
  });
  const [paymentProofFile, setPaymentProofFile] = useState(null);
  const [paymentProofPreview, setPaymentProofPreview] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCourseData();
  }, [id]);

  useEffect(() => {
    if (user) {
      setEnrollmentData({
        enrollmentName: '',
        enrollmentEmail: user.email || '',
        enrollmentPhone: user.phone || '',
      });
    }
  }, [user]);

  const fetchCourseData = async () => {
    try {
      const [courseRes, enrollmentsRes] = await Promise.all([
        coursesAPI.getCourseById(id),
        enrollmentsAPI.getMyEnrollments(),
      ]);

      setCourse(courseRes.data.course);
      setContent(courseRes.data.content || []);

      const userEnrollment = enrollmentsRes.data.find(
        e => e.course?._id === id
      );
      setEnrollment(userEnrollment);

      // Fetch progress if enrolled and approved
      if (userEnrollment && userEnrollment.status === 'approved') {
        try {
          const progressRes = await progressAPI.getCourseProgress(id);
          if (progressRes.data) {
            setProgress(progressRes.data);
          }
        } catch (e) {
          // No progress yet
        }
      }
    } catch (err) {
      setError('Failed to load course details');
    } finally {
      setLoading(false);
    }
  };

  const handleEnrollChange = (e) => {
    setEnrollmentData({
      ...enrollmentData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentProofChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPaymentProofFile(file);
      setPaymentProofPreview(URL.createObjectURL(file));
    }
  };

  const handleEnrollSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!enrollmentData.enrollmentName || !enrollmentData.enrollmentEmail || !enrollmentData.enrollmentPhone) {
      setError('Please fill all enrollment fields');
      return;
    }

    if (!paymentProofFile) {
      setError('Please upload payment proof image');
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('enrollmentName', enrollmentData.enrollmentName);
      formData.append('enrollmentEmail', enrollmentData.enrollmentEmail);
      formData.append('enrollmentPhone', enrollmentData.enrollmentPhone);
      formData.append('paymentProof', paymentProofFile);

      // Debug logging
      console.log('Submitting enrollment with data:');
      console.log('Name:', enrollmentData.enrollmentName);
      console.log('Email:', enrollmentData.enrollmentEmail);
      console.log('Phone:', enrollmentData.enrollmentPhone);
      console.log('File:', paymentProofFile);

      const response = await enrollmentsAPI.enrollCourse(id, formData);
      if (response.success) {
        toast.success('Enrollment submitted! Awaiting admin approval.');
        fetchCourseData();
        setShowEnrollForm(false);
      }
    } catch (err) {
      console.error('Enrollment error:', err);
      const msg = err.response?.data?.message || 'Failed to enroll';
      toast.error(msg);
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!course) return <div>Course not found</div>;

  return (
    <div className="mx-auto max-w-5xl space-y-4 px-4 md:space-y-6 md:px-0">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1 text-sm font-medium text-brand-teal/70 transition-colors hover:text-brand-teal dark:text-slate-400 dark:hover:text-slate-200">
        ← Back
      </button>

      {error && (
        <div className="rounded-lg border border-red-300/40 bg-red-500/15 px-4 py-3 text-sm text-red-100">
          {error}
        </div>
      )}

      <div className="rounded-xl border border-white/10 bg-white p-6 shadow-lg shadow-black/5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-bold text-brand-orange">{course.name}</h2>
          <StatusBadge status={course.isActive ? 'active' : 'inactive'} />
        </div>

        <div className="mt-4 space-y-3">
          <p className="text-sm text-brand-teal/70">{course.description}</p>
          <div className="grid gap-3 text-sm text-brand-teal/70 sm:grid-cols-2">
            <p><span className="font-semibold text-brand-teal">Category:</span> {course.category}</p>
            <p><span className="font-semibold text-brand-teal">Fee:</span> NPR {course.fee}</p>
            <p><span className="font-semibold text-brand-teal">Instructor:</span> {course.instructor?.fullName}</p>
            <p><span className="font-semibold text-brand-teal">Total Enrollments:</span> {course.totalEnrollments}</p>
          </div>
        </div>
      </div>

      {enrollment && enrollment.status !== 'rejected' ? (
        <div className="rounded-xl border border-white/10 bg-white p-6 shadow-lg shadow-black/5 space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-brand-teal">Your Enrollment Status</h3>
            <StatusBadge status={enrollment.status} />
          </div>
          
          {enrollment.status === 'pending' && (
            <div className="rounded-lg border border-brand-orange/30 bg-brand-orange/10 px-4 py-3 text-sm text-brand-orangeDark">
              <strong>⏳ Waiting for Admin Approval</strong>
              <p>Your enrollment is pending review. You will be notified once it's approved.</p>
            </div>
          )}
          
          {enrollment.status === 'approved' && (
            <div className="space-y-4">
              {progress && (
                <div className="rounded-lg border border-brand-teal/10 bg-brand-teal/5 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-brand-teal">Course Progress</h3>
                    <span className={`text-sm font-bold ${progress.progressPercentage === 100 ? 'text-brand-orangeDark' : 'text-brand-orange'}`}>
                      {progress.progressPercentage}%
                    </span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-brand-teal/10">
                    <div
                      className={`h-full rounded-full ${progress.progressPercentage === 100 ? 'bg-brand-orangeDark' : 'bg-brand-orange'}`}
                      style={{ width: `${progress.progressPercentage}%` }}
                    ></div>
                  </div>
                  <p className="mt-2 text-xs text-brand-teal/70">
                    {progress.completedContents?.length || 0} of {content.length} lessons completed
                    {progress.progressPercentage === 100 && ' — Exam Unlocked! 🎉'}
                  </p>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold text-brand-teal">Course Content</h3>
                {content.length > 0 ? (
                  <div className="mt-3 space-y-2">
                    {content.map((item, index) => {
                      const isCompleted = progress?.completedContents?.some(
                        c => (c._id || c) === item._id
                      );
                      return (
                        <Link
                          key={item._id}
                          to={`/student/content/${course._id}/${item._id}`}
                          className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-sm ${isCompleted ? 'border-brand-orange/30 bg-brand-orange/10' : 'border-brand-teal/10 bg-white'}`}
                        >
                          <span className={`text-xs font-semibold ${isCompleted ? 'text-brand-orangeDark' : 'text-brand-teal/60'}`}>
                            {isCompleted ? '✓' : `${index + 1}.`}
                          </span>
                          <span className={`flex-1 font-semibold ${isCompleted ? 'text-brand-orangeDark' : 'text-brand-teal'}`}>
                            {item.title}
                          </span>
                          <span className="text-xs text-brand-teal/60 capitalize">{item.type}</span>
                          {isCompleted && (
                            <span className="text-xs font-semibold text-brand-orangeDark">Completed</span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-brand-teal/70">No content available yet.</p>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-xl border border-white/10 bg-white p-6 shadow-lg shadow-black/5">
          {enrollment && enrollment.status === 'rejected' && (
            <div className="mb-4 rounded-lg border border-red-300/40 bg-red-500/15 px-4 py-3 text-sm text-red-100">
              <strong>❌ Previous Enrollment Rejected</strong>
              <p>Your previous enrollment was not approved. You can try enrolling again below.</p>
            </div>
          )}
          
          {showEnrollForm ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-brand-teal">Enrollment Form</h3>
              
              <div className="rounded-lg border border-brand-teal/10 bg-brand-teal/5 p-4">
                <h4 className="text-sm font-semibold text-brand-teal">Scan QR to Pay</h4>
                <SafeImage 
                  src={getImageUrl(course.qrImage)} 
                  alt="Payment QR"
                  className="mt-3 w-full max-w-[250px] rounded-lg border border-brand-teal/10"
                />
                <p className="mt-3 text-sm font-semibold text-brand-teal">Amount: NPR {course.fee}</p>
                <p className="text-xs text-brand-teal/70">After payment, fill the form below and upload payment proof</p>
              </div>

              <form onSubmit={handleEnrollSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-brand-teal">Full Name (as per eSewa/payment) *</label>
                  <input
                    type="text"
                    name="enrollmentName"
                    value={enrollmentData.enrollmentName}
                    onChange={handleEnrollChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full rounded-lg border border-brand-teal/20 bg-white px-3 py-2 text-sm text-brand-teal focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30"
                  />
                  <p className="text-xs text-red-600">⚠ Name must match your payment account name</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-brand-teal">Email *</label>
                  <input
                    type="email"
                    name="enrollmentEmail"
                    value={enrollmentData.enrollmentEmail}
                    onChange={handleEnrollChange}
                    required
                    readOnly
                    className="w-full rounded-lg border border-brand-teal/20 bg-brand-teal/5 px-3 py-2 text-sm text-brand-teal"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-brand-teal">Phone Number *</label>
                  <input
                    type="tel"
                    name="enrollmentPhone"
                    value={enrollmentData.enrollmentPhone}
                    onChange={handleEnrollChange}
                    required
                    readOnly
                    className="w-full rounded-lg border border-brand-teal/20 bg-brand-teal/5 px-3 py-2 text-sm text-brand-teal"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-brand-teal">Payment Proof (Screenshot) *</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePaymentProofChange}
                    required
                    className="block w-full text-sm text-brand-teal/70"
                  />
                  {paymentProofPreview && (
                    <div className="mt-2">
                      <img 
                        src={paymentProofPreview} 
                        alt="Payment Proof Preview" 
                        className="w-full max-w-[200px] rounded-lg border border-brand-teal/10"
                      />
                    </div>
                  )}
                  <p className="text-xs text-brand-teal/70">Upload a screenshot of your payment confirmation</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button type="submit" className="rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:bg-brand-orangeDark" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit Enrollment'}
                  </button>
                  <button 
                    type="button" 
                    className="rounded-lg border border-brand-teal/20 bg-white px-4 py-2 text-sm font-semibold text-brand-teal hover:bg-brand-teal/5"
                    onClick={() => setShowEnrollForm(false)}
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <button onClick={() => setShowEnrollForm(true)} className="rounded-lg bg-brand-orange px-5 py-2 text-sm font-semibold text-white hover:bg-brand-orangeDark">
              Enroll Now
            </button>
          )}
        </div>
      )}

      {/* Reviews Section */}
      <ReviewSection
        courseId={id}
        isEnrolled={enrollment && enrollment.status === 'approved'}
      />
    </div>
  );
};

export default CourseDetail;