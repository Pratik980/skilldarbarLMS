import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { enrollmentsAPI } from '../../api/enrollments';
import { coursesAPI } from '../../api/courses';
import { progressAPI } from '../../api/progress';
import LoadingSpinner from '../../components/LoadingSpinner';
import StatusBadge from '../../components/StatusBadge';
import { Clock, BookOpen, Users, Award, Lock, CheckCircle, XCircle, FileText, TrendingUp, Target, Calendar, Sparkles } from 'lucide-react';
import { getImageUrl } from '../../utils/imageUrl';
import SafeImage from '../../components/SafeImage';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { useAuth } from '../../hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();
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
  const completedEnrollments = approvedEnrollments.filter(e => {
    const progress = progressData[e.course?._id];
    return progress?.examPassed === true;
  });

  // Calculate weekly learning progress (last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return {
      date: date.toLocaleDateString('en-US', { weekday: 'short' }),
      courses: 0,
    };
  });

  // Count courses accessed each day based on progress data
  Object.values(progressData).forEach(progress => {
    if (progress.lastAccessedAt) {
      const lastAccessed = new Date(progress.lastAccessedAt);
      const daysAgo = Math.floor((Date.now() - lastAccessed.getTime()) / (1000 * 60 * 60 * 24));
      if (daysAgo < 7) {
        const index = 6 - daysAgo;
        if (index >= 0 && index < 7) {
          last7Days[index].courses += 1;
        }
      }
    }
  });

  const enrolledVsCompletedData = [
    { name: 'Enrolled', value: approvedEnrollments.length, fill: '#F97316' },
    { name: 'Completed', value: completedEnrollments.length, fill: '#10B981' },
  ];

  if (loading) return <LoadingSpinner />;

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 md:space-y-8 md:px-0">
      {/* Welcome Header */}
      <div className="rounded-xl border border-brand-orange/20 bg-gradient-to-r from-brand-orange/10 via-brand-orange/5 to-transparent p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-brand-orange/20 p-3">
            <Sparkles className="h-6 w-6 text-brand-orange" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-brand-orange md:text-3xl">Welcome back, {user?.fullName?.split(' ')[0] || 'Student'}!</h2>
            <p className="mt-1 text-sm text-brand-teal/70">Track your learning progress and continue your journey</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-300/40 bg-red-500/15 px-4 py-3 text-sm text-red-100">
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-5">
        <div className="group rounded-xl border border-brand-teal/10 bg-gradient-to-br from-white to-brand-teal/5 p-5 shadow-lg shadow-black/5 transition-all hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-teal/60">Total Courses</p>
              <p className="mt-2 text-3xl font-bold text-brand-teal">{courses.length}</p>
            </div>
            <div className="rounded-lg bg-brand-teal/10 p-3 transition-colors group-hover:bg-brand-teal/20">
              <BookOpen className="h-6 w-6 text-brand-teal" />
            </div>
          </div>
        </div>
        
        <div className="group rounded-xl border border-brand-orange/10 bg-gradient-to-br from-white to-brand-orange/5 p-5 shadow-lg shadow-black/5 transition-all hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-orange/60">Enrolled</p>
              <p className="mt-2 text-3xl font-bold text-brand-orange">{approvedEnrollments.length}</p>
            </div>
            <div className="rounded-lg bg-brand-orange/10 p-3 transition-colors group-hover:bg-brand-orange/20">
              <CheckCircle className="h-6 w-6 text-brand-orange" />
            </div>
          </div>
        </div>
        
        <div className="group rounded-xl border border-green-600/10 bg-gradient-to-br from-white to-green-50 p-5 shadow-lg shadow-black/5 transition-all hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-green-600/60">Completed</p>
              <p className="mt-2 text-3xl font-bold text-green-600">{completedEnrollments.length}</p>
            </div>
            <div className="rounded-lg bg-green-600/10 p-3 transition-colors group-hover:bg-green-600/20">
              <Award className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="group rounded-xl border border-yellow-600/10 bg-gradient-to-br from-white to-yellow-50 p-5 shadow-lg shadow-black/5 transition-all hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-yellow-600/60">Pending</p>
              <p className="mt-2 text-3xl font-bold text-yellow-600">{pendingEnrollments.length}</p>
            </div>
            <div className="rounded-lg bg-yellow-600/10 p-3 transition-colors group-hover:bg-yellow-600/20">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="group rounded-xl border border-brand-teal/10 bg-gradient-to-br from-white to-brand-teal/5 p-5 shadow-lg shadow-black/5 transition-all hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-teal/60">Completion Rate</p>
              <p className="mt-2 text-3xl font-bold text-brand-teal">
                {approvedEnrollments.length > 0 ? ((completedEnrollments.length / approvedEnrollments.length) * 100).toFixed(0) : 0}%
              </p>
            </div>
            <div className="rounded-lg bg-brand-teal/10 p-3 transition-colors group-hover:bg-brand-teal/20">
              <TrendingUp className="h-6 w-6 text-brand-teal" />
            </div>
          </div>
        </div>
      </div>

      {/* Progress Charts */}
      {approvedEnrollments.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
          {/* Course Progress Bar Chart */}
          <div className="rounded-xl border border-white/10 bg-white p-4 shadow-lg shadow-black/5 md:p-6">
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
          <div className="rounded-xl border border-white/10 bg-white p-4 shadow-lg shadow-black/5 md:p-6">
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

          {/* Weekly Learning Progress */}
          <div className="rounded-xl border border-white/10 bg-white p-4 shadow-lg shadow-black/5 md:p-6">
            <h3 className="mb-4 text-lg font-semibold text-brand-teal">Weekly Learning Activity (Last 7 Days)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={last7Days} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#1D4A5A' }} />
                <YAxis tick={{ fontSize: 12, fill: '#1D4A5A' }} />
                <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }} formatter={(v) => [`${v}`, 'Courses Accessed']} />
                <Bar dataKey="courses" fill="#1D4A5A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Enrolled vs Completed Comparison */}
          <div className="rounded-xl border border-white/10 bg-white p-4 shadow-lg shadow-black/5 md:p-6">
            <h3 className="mb-4 text-lg font-semibold text-brand-teal">Enrolled vs Completed</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={enrolledVsCompletedData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#1D4A5A' }} />
                <YAxis tick={{ fontSize: 12, fill: '#1D4A5A' }} />
                <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {enrolledVsCompletedData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* My Enrollments Section */}
      <div className="rounded-xl border border-white/10 bg-white p-6 shadow-lg shadow-black/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-brand-orange" />
            <h3 className="text-lg font-bold text-brand-teal">My Enrollments</h3>
          </div>
          {enrollments.length > 0 && (
            <Link to="/student/my-enrollments" className="text-sm font-semibold text-brand-orange hover:text-brand-orangeDark">
              View All →
            </Link>
          )}
        </div>
        {enrollments.length === 0 ? (
          <div className="mt-6 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-brand-teal/20 bg-brand-teal/5 py-12">
            <BookOpen className="h-12 w-12 text-brand-teal/40" />
            <p className="mt-4 text-sm font-medium text-brand-teal/70">No enrollments yet</p>
            <Link to="/student/courses" className="mt-2 rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-orangeDark">
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {enrollments.slice(0, 6).map(enrollment => {
              const course = enrollment.course;
              const progress = progressData[course?._id];
              const examStatus = progress?.examAttempted
                ? (progress?.examPassed ? 'Passed' : 'Failed')
                : (progress?.progressPercentage === 100 ? 'Unlocked' : 'Locked');
              const certStatus = progress?.certificateGenerated ? 'Available' : 'Not Available';
              
              return (
                <Link
                  key={enrollment._id}
                  to="/student/my-enrollments"
                  className="group overflow-hidden rounded-xl border border-brand-teal/10 bg-white transition-all hover:shadow-lg"
                >
                  <div className="relative h-40 bg-slate-100">
                    <SafeImage 
                      src={getImageUrl(course?.thumbnail)} 
                      alt={course?.name} 
                      className="h-full w-full object-cover" 
                      fallbackIcon={<BookOpen size={40} className="text-brand-teal/40" />} 
                    />
                    <div className="absolute right-3 top-3">
                      <StatusBadge status={enrollment.status} />
                    </div>
                    {progress && progress.progressPercentage === 100 && progress.examPassed && (
                      <div className="absolute left-3 top-3 rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white shadow-lg">
                        ✓ Completed
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-brand-teal group-hover:text-brand-orange">{course?.name}</h4>
                    <div className="mt-2 flex items-center gap-2 text-xs text-brand-teal/60">
                      <Calendar size={12} />
                      <span>Enrolled: {new Date(enrollment.enrolledAt).toLocaleDateString()}</span>
                    </div>
                    
                    {enrollment.status === 'approved' && progress && (
                      <>
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs font-semibold text-brand-teal/80">
                            <span>Progress</span>
                            <span>{progress.progressPercentage}%</span>
                          </div>
                          <div className="mt-1 h-2.5 w-full overflow-hidden rounded-full bg-brand-teal/10">
                            <div 
                              className="h-full rounded-full bg-gradient-to-r from-brand-orange to-brand-orangeDark transition-all"
                              style={{ width: `${progress.progressPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold ${
                            examStatus === 'Passed' ? 'bg-green-100 text-green-700' :
                            examStatus === 'Failed' ? 'bg-red-100 text-red-700' :
                            examStatus === 'Unlocked' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {examStatus === 'Locked' && <Lock size={12} />}
                            {examStatus === 'Passed' && <CheckCircle size={12} />}
                            {examStatus === 'Failed' && <XCircle size={12} />}
                            {examStatus === 'Unlocked' && <FileText size={12} />}
                            {examStatus}
                          </span>
                          {certStatus === 'Available' && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-brand-orange/15 px-2.5 py-1 text-xs font-semibold text-brand-orangeDark">
                              <Award size={12} />
                              Certificate
                            </span>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Pending Courses Section */}
      {pendingEnrollments.length > 0 && (
        <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 shadow-lg shadow-black/5 md:p-6">
          <div className="flex items-center gap-2">
            <Clock size={20} className="text-yellow-600" />
            <h3 className="text-base font-semibold text-yellow-800 md:text-lg">Pending Courses</h3>
            <span className="ml-auto rounded-full bg-yellow-600 px-3 py-1 text-xs font-bold text-white">{pendingEnrollments.length}</span>
          </div>
          <p className="mt-2 text-sm text-yellow-700">These courses are awaiting admin approval.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {pendingEnrollments.map(enrollment => {
              const course = enrollment.course;
              return (
                <div key={enrollment._id} className="overflow-hidden rounded-xl border border-yellow-300 bg-white">
                  <div className="relative h-32 bg-slate-100">
                    <SafeImage 
                      src={getImageUrl(course.thumbnail)} 
                      alt={course.name} 
                      className="h-full w-full object-cover" 
                      fallbackIcon={<BookOpen size={32} className="text-brand-teal/40" />} 
                    />
                    <div className="absolute right-3 top-3 rounded-full bg-yellow-500 px-3 py-1 text-xs font-semibold text-white">
                      ⏳ Pending
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-sm font-semibold text-brand-teal">{course.name}</h4>
                    <p className="mt-1 text-xs text-brand-teal/70">
                      Enrolled: {new Date(enrollment.enrolledAt).toLocaleDateString()}
                    </p>
                    <p className="mt-2 text-xs text-yellow-700">
                      Waiting for admin approval
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Continue Learning Section */}
      {approvedEnrollments.length > 0 && (
      <div className="rounded-xl border border-white/10 bg-white p-6 shadow-lg shadow-black/5">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-brand-orange" />
          <h3 className="text-lg font-bold text-brand-teal">Continue Learning</h3>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {approvedEnrollments.slice(0, 4).map(enrollment => {
            const course = enrollment.course;
            const progress = progressData[course._id];
            return (
              <Link 
                to={`/student/my-enrollments`}
                key={course._id} 
                className="group overflow-hidden rounded-xl border border-brand-teal/10 bg-white transition-all hover:scale-[1.02] hover:shadow-xl"
              >
                <div className="relative h-36 bg-slate-100">
                  <SafeImage src={getImageUrl(course.thumbnail)} alt={course.name} className="h-full w-full object-cover transition-transform group-hover:scale-105" fallbackIcon={<BookOpen size={40} className="text-brand-teal/40" />} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                  {progress && progress.progressPercentage === 100 && progress.examPassed && (
                    <div className="absolute left-3 top-3 rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white shadow-lg">
                      ✓ Certificate Ready
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-semibold text-brand-teal group-hover:text-brand-orange transition-colors">{course.name}</h4>
                  <p className="mt-1 line-clamp-2 text-xs text-brand-teal/70">{course.description || 'No description available'}</p>
                  
                  {progress && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-brand-teal/70">Progress</span>
                        <span className="text-brand-orange">{progress.progressPercentage}%</span>
                      </div>
                      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-brand-teal/10">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-brand-orange to-brand-orangeDark transition-all"
                          style={{ width: `${progress.progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-brand-teal/70">
                    <span className="inline-flex items-center gap-1"><Clock size={12} /> {course.duration || 'N/A'}</span>
                    <span className="inline-flex items-center gap-1"><BookOpen size={12} /> {course.lectures || 0}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      )}

      {/* Available Courses Section */}
      <div className="rounded-xl border border-white/10 bg-white p-6 shadow-lg shadow-black/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-brand-orange" />
            <h3 className="text-lg font-bold text-brand-teal">Available Courses</h3>
          </div>
          {courses.length > 6 && (
            <Link to="/student/courses" className="text-sm font-semibold text-brand-orange hover:text-brand-orangeDark">View All →</Link>
          )}
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.slice(0, 6).map(course => {
            const enrolled = enrollments.some(e => e.course?._id === course._id);
            const enrollmentStatus = enrollments.find(e => e.course?._id === course._id)?.status;
            return (
              <Link 
                to={`/student/courses/${course._id}`}
                key={course._id} 
                className="group overflow-hidden rounded-xl border border-brand-teal/10 bg-white transition-all hover:scale-[1.02] hover:shadow-xl"
              >
                <div className="relative h-40 bg-slate-100">
                  <SafeImage src={getImageUrl(course.thumbnail)} alt={course.name} className="h-full w-full object-cover transition-transform group-hover:scale-105" fallbackIcon={<BookOpen size={32} className="text-brand-teal/40" />} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                  <div className="absolute left-3 top-3 rounded-full bg-brand-orange px-3 py-1 text-xs font-bold text-white shadow-lg">
                    {course.category || 'Course'}
                  </div>
                  {enrolled && enrollmentStatus && (
                    <div className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-bold text-white shadow-lg ${
                      enrollmentStatus === 'approved' ? 'bg-green-600' : 'bg-yellow-600'
                    }`}>
                      {enrollmentStatus === 'approved' ? '✓ Enrolled' : '⏳ Pending'}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-semibold text-brand-teal group-hover:text-brand-orange transition-colors">{course.name}</h4>
                  <p className="mt-1 line-clamp-2 text-xs text-brand-teal/70">
                    {course.description || 'No description available'}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-brand-teal/70">
                    <span className="inline-flex items-center gap-1"><Clock size={14} /> {course.duration || 'N/A'}</span>
                    <span className="inline-flex items-center gap-1"><BookOpen size={14} /> {course.lectures || 0} lessons</span>
                    <span className="inline-flex items-center gap-1"><Users size={14} /> {course.totalEnrollments || 0} students</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-brand-orange">NPR {course.fee}</span>
                    {!enrolled && (
                      <span className="rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-bold text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white">
                        Enroll →
                      </span>
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