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
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold text-brand-orange">Manage Courses</h2>
        <Link
          to="/admin/courses/new"
          className="rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:bg-brand-orangeDark"
        >
          + Add New Course
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search courses by name or category..."
          className="w-full max-w-md rounded-lg border border-brand-teal/20 bg-white px-4 py-2.5 text-sm text-brand-teal placeholder:text-brand-teal/40 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="rounded-lg border border-brand-teal/20 bg-white px-4 py-2.5 text-sm font-semibold text-brand-teal hover:bg-brand-teal/5"
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

      <div className="rounded-xl border border-white/10 bg-white shadow-lg shadow-black/5">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-teal/10 bg-brand-teal/5 text-left text-xs font-semibold uppercase tracking-wider text-brand-teal/70">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Fee</th>
                <th className="px-4 py-3">Instructor</th>
                <th className="px-4 py-3">Enrollments</th>
                <th className="px-4 py-3">Revenue</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-teal/10">
              {filteredCourses.map(course => (
                <tr key={course._id} className="hover:bg-brand-teal/5">
                  <td className="px-4 py-3 font-medium text-brand-teal">{course.name}</td>
                  <td className="px-4 py-3 text-brand-teal/70">{course.category}</td>
                  <td className="px-4 py-3 text-brand-teal/70">NPR {course.fee}</td>
                  <td className="px-4 py-3 text-brand-teal/70">{course.instructor?.fullName}</td>
                  <td className="px-4 py-3 text-brand-teal/70">{course.totalEnrollments}</td>
                  <td className="px-4 py-3 text-brand-teal/70">NPR {course.revenue || course.totalRevenue || 0}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={course.isActive ? 'active' : 'inactive'} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        to={`/admin/courses/edit/${course._id}`}
                        className="rounded-lg border border-brand-teal/20 bg-white px-3 py-1.5 text-xs font-semibold text-brand-teal hover:bg-brand-teal/5"
                      >
                        Edit
                      </Link>
                      <Link
                        to={`/admin/courses/${course._id}/exam`}
                        className="rounded-lg border border-brand-teal/20 bg-white px-3 py-1.5 text-xs font-semibold text-brand-teal hover:bg-brand-teal/5"
                      >
                        Exam (MCQ)
                      </Link>
                      <Link
                        to={`/admin/courses/${course._id}/exam-results`}
                        className="rounded-lg border border-brand-teal/20 bg-white px-3 py-1.5 text-xs font-semibold text-brand-teal hover:bg-brand-teal/5"
                      >
                        Results
                      </Link>
                      <button
                        onClick={() => handleToggleStatus(course._id)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${course.isActive ? 'bg-brand-orange/15 text-brand-orangeDark' : 'bg-brand-teal/10 text-brand-teal'}`}
                      >
                        {course.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleDelete(course._id)}
                        className="rounded-lg bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-700"
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