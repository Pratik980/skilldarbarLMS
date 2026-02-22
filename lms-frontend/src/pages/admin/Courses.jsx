import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../../api/admin';
import { coursesAPI } from '../../api/courses';
import LoadingSpinner from '../../components/LoadingSpinner';
import StatusBadge from '../../components/StatusBadge';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const filteredCourses = courses.filter(course =>
    course.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await adminAPI.getAllCoursesAnalytics();
      setCourses(response.data || []);
    } catch (err) {
      setError('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const response = await coursesAPI.toggleCourseStatus(id);
      if (response.success) {
        fetchCourses(); // Refresh list
      }
    } catch (err) {
      setError('Failed to toggle course status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) {
      return;
    }

    try {
      const response = await coursesAPI.deleteCourse(id);
      if (response.success) {
        fetchCourses(); // Refresh list
      }
    } catch (err) {
      setError('Failed to delete course');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="mx-auto max-w-7xl space-y-4 px-4 md:space-y-6 md:px-0">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold text-brand-orange md:text-2xl">Manage Courses</h2>
        <Link
          to="/admin/courses/new"
          className="rounded-lg bg-brand-orange px-4 py-2 text-center text-sm font-semibold text-white hover:bg-brand-orangeDark"
        >
          + Add New Course
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search courses by name or category..."
          className="flex-1 rounded-lg border border-brand-teal/20 bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-slate-400 px-4 py-2.5 text-sm text-brand-teal placeholder:text-brand-teal/40 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="w-full rounded-lg border border-brand-teal/20 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-200 px-4 py-2.5 text-sm font-semibold text-brand-teal hover:bg-brand-teal/5 dark:hover:bg-slate-700 sm:w-auto"
          >
            Clear
          </button>
        )}
      </div>

      {error && (
        <div className="rounded-lg border border-red-300/40 bg-red-500/15 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="rounded-xl border border-white/10 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg shadow-black/5">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-teal/10 dark:border-slate-700 bg-brand-teal/5 dark:bg-slate-700 text-left text-xs font-semibold uppercase tracking-wider text-brand-teal/70 dark:text-slate-400">
                <th className="px-3 py-3 md:px-4">Name</th>
                <th className="px-3 py-3 md:px-4">Category</th>
                <th className="px-3 py-3 md:px-4">Fee</th>
                <th className="hidden px-3 py-3 sm:table-cell md:px-4">Instructor</th>
                <th className="hidden px-3 py-3 lg:table-cell md:px-4">Enrollments</th>
                <th className="hidden px-3 py-3 lg:table-cell md:px-4">Revenue</th>
                <th className="px-3 py-3 md:px-4">Status</th>
                <th className="px-3 py-3 md:px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-teal/10 dark:divide-slate-700">
              {filteredCourses.map(course => (
                <tr key={course._id} className="hover:bg-brand-teal/5 dark:hover:bg-slate-700">
                  <td className="px-3 py-3 font-medium text-brand-teal dark:text-slate-200 md:px-4">{course.name}</td>
                  <td className="px-3 py-3 text-brand-teal/70 dark:text-slate-400 md:px-4">{course.category}</td>
                  <td className="px-3 py-3 text-brand-teal/70 dark:text-slate-400 md:px-4">{course.fee}</td>
                  <td className="hidden px-3 py-3 text-brand-teal/70 dark:text-slate-400 sm:table-cell md:px-4">{course.instructor?.fullName}</td>
                  <td className="hidden px-3 py-3 text-brand-teal/70 dark:text-slate-400 lg:table-cell md:px-4">{course.totalEnrollments}</td>
                  <td className="hidden px-3 py-3 text-brand-teal/70 dark:text-slate-400 lg:table-cell md:px-4">NPR {course.revenue || course.totalRevenue || 0}</td>
                  <td className="px-3 py-3 md:px-4">
                    <StatusBadge status={course.isActive ? 'active' : 'inactive'} />
                  </td>
                  <td className="px-3 py-3 md:px-4">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        to={`/admin/courses/edit/${course._id}`}
                        className="rounded-lg border border-brand-teal/20 dark:border-slate-700 bg-white dark:bg-slate-700 px-2 py-1 text-xs font-semibold text-brand-teal dark:text-slate-200 hover:bg-brand-teal/5 dark:hover:bg-slate-600 md:px-3 md:py-1.5"
                      >
                        Edit
                      </Link>
                      <Link
                        to={`/admin/courses/${course._id}/exam`}
                        className="rounded-lg border border-brand-teal/20 dark:border-slate-700 bg-white dark:bg-slate-700 px-2 py-1 text-xs font-semibold text-brand-teal dark:text-slate-200 hover:bg-brand-teal/5 dark:hover:bg-slate-600 md:px-3 md:py-1.5"
                      >
                        Exam
                      </Link>
                      <Link
                        to={`/admin/courses/${course._id}/exam-results`}
                        className="hidden rounded-lg border border-brand-teal/20 dark:border-slate-700 bg-white dark:bg-slate-700 px-2 py-1 text-xs font-semibold text-brand-teal dark:text-slate-200 hover:bg-brand-teal/5 dark:hover:bg-slate-600 sm:inline-block md:px-3 md:py-1.5"
                      >
                        Results
                      </Link>
                      <button
                        onClick={() => handleToggleStatus(course._id)}
                        className={`rounded-lg px-2 py-1 text-xs font-semibold md:px-3 md:py-1.5 ${course.isActive ? 'bg-brand-orange/15 text-brand-orangeDark' : 'bg-brand-teal/10 text-brand-teal'}`}
                      >
                        {course.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleDelete(course._id)}
                        className="hidden rounded-lg bg-red-100 px-2 py-1 text-xs font-semibold text-red-700 lg:inline-block md:px-3 md:py-1.5"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredCourses.length === 0 && (
        <p className="text-center text-sm text-brand-teal/50">
          {searchTerm ? `No courses found matching "${searchTerm}"` : 'No courses found'}
        </p>
      )}
    </div>
  );
};

export default Courses;