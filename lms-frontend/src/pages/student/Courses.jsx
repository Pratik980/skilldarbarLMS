import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { coursesAPI } from '../../api/courses';
import { enrollmentsAPI } from '../../api/enrollments';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Clock, BookOpen, ZoomIn, Award, TrendingUp, Users, CheckCircle2 } from 'lucide-react';
import { getImageUrl } from '../../utils/imageUrl';
import SafeImage from '../../components/SafeImage';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const filteredCourses = courses.filter(course =>
    course.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [coursesRes, enrollmentsRes] = await Promise.all([
        coursesAPI.getAllCourses(),
        enrollmentsAPI.getMyEnrollments(),
      ]);
      setCourses(coursesRes.data || []);
      setEnrollments(enrollmentsRes.data || []);
    } catch (err) {
      setError('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const isEnrolled = (courseId) => {
    return enrollments.some(e => e.course?._id === courseId);
  };

  const getEnrollmentStatus = (courseId) => {
    const enrollment = enrollments.find(e => e.course?._id === courseId);
    return enrollment?.status;
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="mx-auto max-w-7xl space-y-4 px-4 md:space-y-6 md:px-0">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-brand-orange md:text-2xl">Available Courses</h2>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search courses by name or category..."
          className="flex-1 rounded-lg border border-brand-teal/20 bg-white px-4 py-2.5 text-sm text-brand-teal placeholder:text-brand-teal/40 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="w-full rounded-lg border border-brand-teal/20 bg-white px-4 py-2.5 text-sm font-semibold text-brand-teal hover:bg-brand-teal/5 sm:w-auto"
          >
            Clear
          </button>
        )}
      </div>

      {error && (
        <div className="rounded-lg border border-red-300/40 bg-red-500/15 px-4 py-3 text-sm text-red-100">
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
        {filteredCourses.map(course => {
          const enrolledStatus = getEnrollmentStatus(course._id);
          const isPending = enrolledStatus === 'pending';
          const isApproved = enrolledStatus === 'approved';
          return (
            <div key={course._id} className="group overflow-hidden rounded-2xl border border-brand-teal/10 bg-white shadow-lg shadow-black/5 transition-shadow hover:shadow-xl">
              <div className="relative h-44 bg-slate-100">
                <SafeImage 
                  src={getImageUrl(course.thumbnail)} 
                  alt={course.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent"></div>
                <div className="absolute left-3 top-3 flex items-center gap-2">
                  {course.totalEnrollments > 100 && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand-orange/15 px-2 py-1 text-xs font-semibold text-brand-orangeDark">
                      <Award size={12} /> Bestseller
                    </span>
                  )}
                  <span className="rounded-full bg-brand-orange px-2 py-1 text-xs font-semibold text-white">82% OFF</span>
                </div>
                <button className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-brand-teal" onClick={() => navigate(`/student/courses/${course._id}`)}>
                  <ZoomIn size={16} />
                </button>
              </div>

              <div className="p-5 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-brand-teal/10 px-3 py-1 text-xs font-semibold text-brand-teal">
                  <TrendingUp size={14} /> {course.category}
                </div>

                <div>
                  <h3 className="text-base font-semibold text-brand-teal">{course.name}</h3>
                  <div className="mt-2 flex flex-wrap gap-3 text-xs text-brand-teal/70">
                    <span className="inline-flex items-center gap-1"><Clock size={15} /> {course.duration || '0h'}</span>
                    <span className="inline-flex items-center gap-1"><BookOpen size={15} /> {course.lectures || 0} lectures</span>
                    <span className="inline-flex items-center gap-1"><Users size={15} /> {course.totalEnrollments >= 1000 ? `${(course.totalEnrollments / 1000).toFixed(1)}K` : course.totalEnrollments || 0}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-orange/15 px-2 py-1 text-xs font-semibold text-brand-orangeDark">
                    <Award size={12} /> Intermediate
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-teal/10 px-2 py-1 text-xs font-semibold text-brand-teal">
                    <CheckCircle2 size={12} /> Certificate
                  </span>
                </div>

                <div className="rounded-lg border border-brand-teal/10 bg-brand-teal/5 p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-brand-teal">NPR {course.fee}</span>
                    <span className="text-xs text-brand-teal/40 line-through">NPR {Math.round(course.fee * 4.8)}</span>
                  </div>
                  <div className="text-xs text-brand-teal/70">You save NPR {Math.round(course.fee * 3.8)} • Limited time offer</div>
                </div>

                <div>
                  {isEnrolled(course._id) ? (
                    <>
                      {isPending && (
                        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-teal/10 px-4 py-2 text-sm font-semibold text-brand-teal" disabled>
                          <Clock size={18} /> Pending Approval
                        </button>
                      )}
                      {isApproved && (
                        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-orange/15 px-4 py-2 text-sm font-semibold text-brand-orangeDark" disabled>
                          <CheckCircle2 size={18} /> Enrolled Successfully
                        </button>
                      )}
                      {enrolledStatus === 'rejected' && (
                        <button
                          onClick={() => navigate(`/student/courses/${course._id}`)}
                          className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:bg-brand-orangeDark"
                        >
                          <TrendingUp size={18} /> Enroll Now
                        </button>
                      )}
                    </>
                  ) : (
                    <button 
                      onClick={() => navigate(`/student/courses/${course._id}`)}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:bg-brand-orangeDark"
                    >
                      <TrendingUp size={18} /> Enroll Now - Limited Seats
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <p className="text-center text-sm text-brand-teal/50">
          {searchTerm ? `No courses found matching "${searchTerm}"` : 'No courses available at the moment.'}
        </p>
      )}
    </div>
  );
};

export default Courses;