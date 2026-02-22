import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { coursesAPI } from '../../api/courses';
import { contentAPI } from '../../api/content';
import LoadingSpinner from '../../components/LoadingSpinner';
import { getImageUrl } from '../../utils/imageUrl';
import SafeImage from '../../components/SafeImage';

const CourseContent = () => {
  const { courseId } = useParams();
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [contentList, setContentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  // Auto-select course from URL param
  useEffect(() => {
    if (courseId && courses.length > 0 && !selectedCourse) {
      const course = courses.find(c => c._id === courseId);
      if (course) {
        handleSelectCourse(course);
      }
    }
  }, [courseId, courses]);

  const fetchCourses = async () => {
    try {
      const response = await coursesAPI.getAllCourses();
      setCourses(response.data || []);
    } catch (err) {
      setError('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCourse = async (course) => {
    setSelectedCourse(course);
    setContentLoading(true);
    setError('');
    try {
      const response = await contentAPI.getCourseContent(course._id);
      setContentList(response.data || []);
    } catch (err) {
      setError('Failed to load content');
    } finally {
      setContentLoading(false);
    }
  };

  const handleDeleteContent = async (contentId) => {
    if (!window.confirm('Delete this content item?')) return;
    try {
      const response = await contentAPI.deleteContent(contentId);
      if (response.success) {
        setContentList(prev => prev.filter(c => c._id !== contentId));
      }
    } catch (err) {
      setError('Failed to delete content');
    }
  };

  const filteredCourses = courses.filter(c =>
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeIcon = (type) => {
    const icons = { video: '🎬', pdf: '📄', image: '🖼️', link: '🔗', youtube: '▶️' };
    return icons[type] || '📁';
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-brand-orange">Course Content</h2>
      </div>

      {/* Search */}
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
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Course List */}
        <div className="lg:col-span-1 space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-teal/60">Courses ({filteredCourses.length})</h3>
          <div className="max-h-[600px] overflow-y-auto space-y-2 rounded-xl border border-brand-teal/10 bg-white p-3 shadow-lg shadow-black/5">
            {filteredCourses.map(course => (
              <button
                key={course._id}
                onClick={() => handleSelectCourse(course)}
                className={`w-full text-left rounded-lg border p-3 transition-colors ${
                  selectedCourse?._id === course._id
                    ? 'border-brand-orange bg-brand-orange/5'
                    : 'border-brand-teal/10 hover:bg-brand-teal/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
                    <SafeImage
                      src={getImageUrl(course.thumbnail)}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-brand-teal">{course.name}</p>
                    <p className="text-xs text-brand-teal/50">{course.category} • {course.totalEnrollments} enrolled</p>
                  </div>
                </div>
              </button>
            ))}
            {filteredCourses.length === 0 && (
              <p className="py-4 text-center text-sm text-brand-teal/50">No courses found</p>
            )}
          </div>
        </div>

        {/* Content Panel */}
        <div className="lg:col-span-2">
          {!selectedCourse ? (
            <div className="flex h-64 items-center justify-center rounded-xl border border-brand-teal/10 bg-white shadow-lg shadow-black/5">
              <p className="text-sm text-brand-teal/50">Select a course to view its content</p>
            </div>
          ) : contentLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-brand-teal">{selectedCourse.name}</h3>
                  <p className="text-sm text-brand-teal/60">{contentList.length} content item{contentList.length !== 1 ? 's' : ''}</p>
                </div>
                <Link
                  to={`/admin/courses/edit/${selectedCourse._id}`}
                  className="rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:bg-brand-orangeDark transition-colors"
                >
                  + Add Content
                </Link>
              </div>

              <div className="space-y-3">
                {contentList.map((item, index) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between rounded-xl border border-brand-teal/10 bg-white p-4 shadow-sm transition-colors hover:shadow-md"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand-teal/5 text-xl">
                        {getTypeIcon(item.type)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-brand-teal">{item.title}</p>
                        <div className="flex items-center gap-3 text-xs text-brand-teal/50">
                          <span className="capitalize">{item.type}</span>
                          {item.duration && <span>{item.duration} min</span>}
                          <span>Order: {item.order ?? index}</span>
                        </div>
                        {item.description && (
                          <p className="mt-1 truncate text-xs text-brand-teal/40">{item.description}</p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteContent(item._id)}
                      className="flex-shrink-0 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                {contentList.length === 0 && (
                  <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-brand-teal/20 bg-white">
                    <div className="text-center">
                      <p className="text-sm text-brand-teal/50">No content yet</p>
                      <Link
                        to={`/admin/courses/edit/${selectedCourse._id}`}
                        className="mt-2 inline-block text-sm font-semibold text-brand-orange hover:underline"
                      >
                        Add content →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
