import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { enrollmentsAPI } from '../../api/enrollments';
import { coursesAPI } from '../../api/courses';
import { progressAPI } from '../../api/progress';
import LoadingSpinner from '../../components/LoadingSpinner';
import StatusBadge from '../../components/StatusBadge';
import { Clock, BookOpen, Users, Award, Lock, CheckCircle, XCircle, FileText } from 'lucide-react';
import { getImageUrl } from '../../utils/imageUrl';
import SafeImage from '../../components/SafeImage';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const Dashboard = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [progressData, setProgressData] = useState({});

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [enrollmentsRes, coursesRes] = await Promise.all([
        enrollmentsAPI.getMyEnrollments(),
        coursesAPI.getAllCourses(),
      ]);

      const enrollmentsData = enrollmentsRes.data || [];
      setEnrollments(enrollmentsData.filter(e => e.course != null));
      setCourses(coursesRes.data || []);

      // Fetch progress for approved enrollments
      const approvedEnrollments = enrollmentsData.filter(e => e.status === 'approved' && e.course != null);
      const progressPromises = approvedEnrollments.map(enrollment =>
        progressAPI.getCourseProgress(enrollment.course._id).catch(() => null)
      );
      const progressResults = await Promise.all(progressPromises);

      const progressMap = {};
      approvedEnrollments.forEach((enrollment, index) => {
        if (progressResults[index]?.data) {
          progressMap[enrollment.course._id] = progressResults[index].data;
        }
      });
      setProgressData(progressMap);
    } catch (err) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const approvedEnrollments = enrollments.filter(e => e.status === 'approved');
  const pendingEnrollments = enrollments.filter(e => e.status === 'pending');

  if (loading) return <LoadingSpinner />;

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <h2 className="text-2xl font-bold text-brand-orange">Student Dashboard</h2>

      {error && (
        <div className="rounded-lg border border-red-300/40 bg-red-500/15 px-4 py-3 text-sm text-red-100">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white p-5 shadow-lg shadow-black/5">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-teal/60">Total Courses</p>
          <p className="mt-2 text-3xl font-bold text-brand-teal">{courses.length}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white p-5 shadow-lg shadow-black/5">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-teal/60">Enrolled</p>
          <p className="mt-2 text-3xl font-bold text-brand-teal">{approvedEnrollments.length}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white p-5 shadow-lg shadow-black/5">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-teal/60">Pending</p>
          <p className="mt-2 text-3xl font-bold text-brand-teal">{pendingEnrollments.length}</p>
        </div>
      </div>

      {/* Progress Charts */}
      {approvedEnrollments.length > 0 && (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* Course Progress Bar Chart */}
          <div className="rounded-xl border border-white/10 bg-white p-6 shadow-lg shadow-black/5">
            <h3 className="mb-4 text-lg font-semibold text-brand-teal">Course Progress</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={approvedEnrollments.map(e => ({
                  name: e.course?.name?.length > 12 ? e.course.name.substring(0, 12) + '...' : e.course?.name,
                  progress: progressData[e.course?._id]?.progressPercentage || 0,
                }))}
                margin={{ top: 5, right: 20, left: 10, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" angle={-35} textAnchor="end" tick={{ fontSize: 11, fill: '#1D4A5A' }} interval={0} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#1D4A5A' }} />
                <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }} formatter={(v) => [`${v}%`, 'Progress']} />
                <Bar dataKey="progress" fill="#F97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Enrollment Status Pie */}
          <div className="rounded-xl border border-white/10 bg-white p-6 shadow-lg shadow-black/5">
            <h3 className="mb-4 text-lg font-semibold text-brand-teal">Enrollment Status</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Approved', value: approvedEnrollments.length },
                    { name: 'Pending', value: pendingEnrollments.length },
                    { name: 'Rejected', value: enrollments.filter(e => e.status === 'rejected').length },
                  ].filter(d => d.value > 0)}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  <Cell fill="#F97316" />
                  <Cell fill="#1D4A5A" />
                  <Cell fill="#EF4444" />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-white/10 bg-white p-6 shadow-lg shadow-black/5">
        <h3 className="text-lg font-semibold text-brand-teal">My Enrollments</h3>
        {enrollments.length === 0 ? (
          <p className="mt-3 text-sm text-brand-teal/70">No enrollments yet. <Link to="/student/courses" className="font-semibold text-brand-orange">Browse courses</Link></p>
        ) : (
          <div className="mt-4 space-y-3">
            {enrollments.map(enrollment => {
              const progress = progressData[enrollment.course?._id];
              const examStatus = progress?.examAttempted
                ? (progress?.examPassed ? 'Passed' : 'Failed')
                : (progress?.progressPercentage === 100 ? 'Unlocked' : 'Locked');
              const certStatus = progress?.certificateGenerated ? 'Available' : 'Not Available';
              const examBadgeClass = examStatus === 'Passed'
                ? 'bg-brand-orange/15 text-brand-orangeDark'
                : examStatus === 'Failed'
                  ? 'bg-red-100 text-red-700'
                  : examStatus === 'Unlocked'
                    ? 'bg-brand-teal/10 text-brand-teal'
                    : 'bg-brand-teal/5 text-brand-teal/70';
              const certBadgeClass = certStatus === 'Available'
                ? 'bg-brand-orange/15 text-brand-orangeDark'
                : 'bg-brand-teal/5 text-brand-teal/70';
              
              return (
                <div key={enrollment._id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-brand-teal/10 bg-brand-teal/5 p-4">
                  <div>
                    <h4 className="text-sm font-semibold text-brand-teal">{enrollment.course?.name}</h4>
                    <p className="text-xs text-brand-teal/70">Enrolled: {new Date(enrollment.enrolledAt).toLocaleDateString()}</p>
                    {enrollment.status === 'approved' && progress && (
                      <>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="h-2 w-28 overflow-hidden rounded-full bg-brand-teal/10">
                            <div 
                              className="h-full rounded-full bg-brand-orange"
                              style={{ width: `${progress.progressPercentage}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-semibold text-brand-teal/80">{progress.progressPercentage}%</span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className={`inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-semibold ${examBadgeClass}`}>
                            {examStatus === 'Locked' && <Lock size={12} />}
                            {examStatus === 'Passed' && <CheckCircle size={12} />}
                            {examStatus === 'Failed' && <XCircle size={12} />}
                            {examStatus === 'Unlocked' && <FileText size={12} />}
                            Exam: {examStatus}
                          </span>
                          <span className={`inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-semibold ${certBadgeClass}`}>
                            <Award size={12} />
                            Cert: {certStatus}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                  <StatusBadge status={enrollment.status} />
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="rounded-xl border border-white/10 bg-white p-6 shadow-lg shadow-black/5">
        <h3 className="text-lg font-semibold text-brand-teal">Continue Learning</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {approvedEnrollments.slice(0, 4).map(enrollment => {
            const course = enrollment.course;
            const progress = progressData[course._id];
            return (
              <Link 
                to={`/student/my-enrollments`}
                key={course._id} 
                className="group overflow-hidden rounded-xl border border-brand-teal/10 bg-white transition-shadow hover:shadow-md"
              >
                <div className="relative h-36 bg-slate-100">
                  <SafeImage src={getImageUrl(course.thumbnail)} alt={course.name} className="h-full w-full object-cover" fallbackIcon={<BookOpen size={40} className="text-brand-teal/40" />} />
                  {progress && progress.progressPercentage === 100 && progress.examPassed && (
                    <div className="absolute left-3 top-3 rounded-full bg-brand-orange/15 px-2 py-1 text-xs font-semibold text-brand-orangeDark">
                      Certificate Ready
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-semibold text-brand-teal group-hover:text-brand-teal">{course.name}</h4>
                  <p className="mt-1 text-xs text-brand-teal/70">{course.description?.substring(0, 80) || ''}...</p>
                  
                  {progress && (
                    <div className="mt-3">
                      <div className="h-2 w-full overflow-hidden rounded-full bg-brand-teal/10">
                        <div 
                          className="h-full rounded-full bg-brand-orange"
                          style={{ width: `${progress.progressPercentage}%` }}
                        ></div>
                      </div>
                      <span className="mt-1 block text-xs font-semibold text-brand-teal/80">{progress.progressPercentage}% Complete</span>
                    </div>
                  )}
                  
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-brand-teal/70">
                    <span className="inline-flex items-center gap-1"><Clock size={14} /> {course.duration || 'N/A'}</span>
                    <span className="inline-flex items-center gap-1"><BookOpen size={14} /> {course.lectures || 0} lectures</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white p-6 shadow-lg shadow-black/5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-brand-teal">Available Courses</h3>
          {courses.length > 4 && (
            <Link to="/student/courses" className="text-sm font-semibold text-brand-orange">View All →</Link>
          )}
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.slice(0, 6).map(course => {
            const enrolled = enrollments.some(e => e.course?._id === course._id);
            const enrollmentStatus = enrollments.find(e => e.course?._id === course._id)?.status;
            const enrollBadgeClass = enrollmentStatus === 'approved'
              ? 'bg-brand-orange/15 text-brand-orangeDark'
              : enrollmentStatus === 'pending'
                ? 'bg-brand-teal/10 text-brand-teal'
                : '';
            return (
              <Link 
                to={`/student/courses/${course._id}`}
                key={course._id} 
                className="group overflow-hidden rounded-xl border border-brand-teal/10 bg-white transition-shadow hover:shadow-md"
              >
                <div className="relative h-36 bg-slate-100">
                  <SafeImage src={getImageUrl(course.thumbnail)} alt={course.name} className="h-full w-full object-cover" fallbackIcon={<BookOpen size={32} className="text-brand-teal/40" />} />
                  <div className="absolute left-3 top-3 rounded-full bg-brand-orange px-2 py-1 text-xs font-semibold text-white">
                    {course.category || 'Course'}
                  </div>
                  {enrolled && enrollmentStatus && (
                    <div className={`absolute right-3 top-3 rounded-full px-2 py-1 text-xs font-semibold ${enrollBadgeClass}`}>
                      {enrollmentStatus === 'approved' ? '✓ Enrolled' : enrollmentStatus === 'pending' ? '⏳ Pending' : ''}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-semibold text-brand-teal group-hover:text-brand-teal">{course.name}</h4>
                  <p className="mt-1 text-xs text-brand-teal/70">
                    {course.description?.substring(0, 90)}{course.description?.length > 90 ? '...' : ''}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-brand-teal/70">
                    <span className="inline-flex items-center gap-1"><Clock size={14} /> {course.duration || 'N/A'}</span>
                    <span className="inline-flex items-center gap-1"><BookOpen size={14} /> {course.lectures || 0} lessons</span>
                    <span className="inline-flex items-center gap-1"><Users size={14} /> {course.totalEnrollments || 0} students</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-base font-bold text-brand-teal">NPR {course.fee}</span>
                    {!enrolled && (
                      <span className="text-xs font-semibold text-brand-orange">Enroll Now →</span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;