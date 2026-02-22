import { useState, useEffect } from 'react';
import { adminAPI } from '../../api/admin';
import LoadingSpinner from '../../components/LoadingSpinner';

const Analytics = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [coursesAnalytics, setCoursesAnalytics] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseDetail, setCourseDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllAnalytics();
  }, []);

  const fetchAllAnalytics = async (search = '') => {
    setLoading(true);
    setError('');
    try {
      const response = await adminAPI.getAllCoursesAnalytics(search);
      setCoursesAnalytics(response.data || []);
    } catch (err) {
      setError('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchAllAnalytics(searchTerm);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleViewDetail = async (courseId) => {
    setDetailLoading(true);
    setError('');
    try {
      const response = await adminAPI.getCourseAnalytics(courseId);
      setCourseDetail(response.data);
      setSelectedCourse(courseId);
    } catch (err) {
      setError('Failed to load course analytics detail');
    } finally {
      setDetailLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-4 px-4 md:space-y-6 md:px-0">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-brand-orange md:text-2xl">Course Analytics</h2>
      </div>

      {/* Search by Course Name */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter Course Name"
          className="flex-1 rounded-lg border border-brand-teal/20 bg-white px-4 py-2.5 text-sm text-brand-teal placeholder:text-brand-teal/40 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30"
        />
        <button
          onClick={handleSearch}
          className="w-full rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-orangeDark sm:w-auto"
        >
          Search
        </button>
        {searchTerm && (
          <button
            onClick={() => { setSearchTerm(''); fetchAllAnalytics(); }}
            className="w-full rounded-lg border border-brand-teal/20 bg-white px-4 py-2.5 text-sm font-semibold text-brand-teal hover:bg-brand-teal/5 sm:w-auto"
          >
            Clear
          </button>
        )}
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* All Courses Analytics Listing */}
          <div className="rounded-xl border border-white/10 bg-white shadow-lg shadow-black/5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-brand-teal/10 bg-brand-teal/5 text-left text-xs font-semibold uppercase tracking-wider text-brand-teal/70">
                    <th className="px-4 py-3">Course</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Fee</th>
                    <th className="px-4 py-3">Enrollments</th>
                    <th className="px-4 py-3">Revenue</th>
                    <th className="px-4 py-3">Completion</th>
                    <th className="px-4 py-3">Rating</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-teal/10">
                  {coursesAnalytics.map(course => (
                    <tr key={course._id} className={`hover:bg-brand-teal/5 transition-colors ${selectedCourse === course._id ? 'bg-brand-orange/5' : ''}`}>
                      <td className="px-4 py-3">
                        <div className="font-medium text-brand-teal">{course.name}</div>
                        <div className="text-xs text-brand-teal/50">{course.instructor?.fullName}</div>
                      </td>
                      <td className="px-4 py-3 text-brand-teal/70">{course.category}</td>
                      <td className="px-4 py-3 text-brand-teal/70">NPR {course.fee}</td>
                      <td className="px-4 py-3">
                        <span className="font-semibold text-brand-teal">{course.totalEnrollments}</span>
                        <span className="text-brand-teal/50 text-xs ml-1">({course.approvedEnrollments} approved)</span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-brand-orange">NPR {course.revenue}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-20 overflow-hidden rounded-full bg-brand-teal/10">
                            <div className="h-full rounded-full bg-brand-orange" style={{ width: `${course.completionRate}%` }} />
                          </div>
                          <span className="text-xs font-semibold text-brand-teal/80">{course.completionRate}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-brand-teal/70">
                        {course.avgRating > 0 ? (
                          <span>⭐ {course.avgRating.toFixed(1)} ({course.reviewCount})</span>
                        ) : (
                          <span className="text-brand-teal/40">No reviews</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleViewDetail(course._id)}
                          className="rounded-lg bg-brand-orange/10 px-3 py-1.5 text-xs font-semibold text-brand-orange hover:bg-brand-orange/20 transition-colors"
                        >
                          View Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {coursesAnalytics.length === 0 && (
            <p className="text-center text-sm text-brand-teal/50">
              {searchTerm ? `No courses found matching "${searchTerm}"` : 'No courses available'}
            </p>
          )}

          {/* Course Detail Analytics */}
          {detailLoading && <LoadingSpinner />}
          
          {courseDetail && !detailLoading && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-brand-orange">{courseDetail.course?.name} - Detailed Analytics</h3>
                <button
                  onClick={() => { setCourseDetail(null); setSelectedCourse(null); }}
                  className="text-sm text-brand-teal/60 hover:text-brand-teal"
                >
                  ✕ Close
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-xl border border-white/10 bg-white p-5 shadow-lg shadow-black/5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-teal/60">Total Enrollments</p>
                  <p className="mt-2 text-2xl font-bold text-brand-teal">{courseDetail.enrollmentStats?.total}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white p-5 shadow-lg shadow-black/5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-teal/60">Revenue</p>
                  <p className="mt-2 text-2xl font-bold text-brand-orange">NPR {courseDetail.revenue}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white p-5 shadow-lg shadow-black/5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-teal/60">Completion Rate</p>
                  <p className="mt-2 text-2xl font-bold text-brand-teal">{courseDetail.completionRate}%</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white p-5 shadow-lg shadow-black/5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-teal/60">Avg Rating</p>
                  <p className="mt-2 text-2xl font-bold text-brand-teal">
                    {courseDetail.reviewSummary?.averageRating > 0 
                      ? `⭐ ${courseDetail.reviewSummary.averageRating.toFixed(1)}` 
                      : 'N/A'}
                  </p>
                  <p className="text-xs text-brand-teal/50">{courseDetail.reviewSummary?.totalReviews || 0} reviews</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-lg border border-brand-teal/10 bg-brand-teal/5 p-4 text-center">
                  <p className="text-2xl font-bold text-brand-orangeDark">{courseDetail.enrollmentStats?.approved}</p>
                  <p className="text-xs font-semibold text-brand-teal/60">Approved</p>
                </div>
                <div className="rounded-lg border border-brand-teal/10 bg-brand-teal/5 p-4 text-center">
                  <p className="text-2xl font-bold text-brand-teal">{courseDetail.enrollmentStats?.pending}</p>
                  <p className="text-xs font-semibold text-brand-teal/60">Pending</p>
                </div>
                <div className="rounded-lg border border-brand-teal/10 bg-brand-teal/5 p-4 text-center">
                  <p className="text-2xl font-bold text-red-600">{courseDetail.enrollmentStats?.rejected}</p>
                  <p className="text-xs font-semibold text-brand-teal/60">Rejected</p>
                </div>
                <div className="rounded-lg border border-brand-teal/10 bg-brand-teal/5 p-4 text-center">
                  <p className="text-2xl font-bold text-brand-teal">{courseDetail.enrollmentStats?.total}</p>
                  <p className="text-xs font-semibold text-brand-teal/60">Total</p>
                </div>
              </div>

              {courseDetail.reviewSummary?.recentReviews?.length > 0 && (
                <div className="rounded-xl border border-white/10 bg-white p-6 shadow-lg shadow-black/5">
                  <h4 className="text-lg font-semibold text-brand-teal">Recent Reviews</h4>
                  <div className="mt-4 space-y-3">
                    {courseDetail.reviewSummary.recentReviews.map((review, i) => (
                      <div key={i} className="rounded-lg border border-brand-teal/10 bg-brand-teal/5 p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-brand-teal">{'⭐'.repeat(review.rating)}</span>
                          <span className="text-xs text-brand-teal/50">{new Date(review.createdAt).toLocaleDateString()}</span>
                        </div>
                        {review.review && <p className="mt-1 text-sm text-brand-teal/70">{review.review}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-xl border border-white/10 bg-white p-6 shadow-lg shadow-black/5">
                <h4 className="text-lg font-semibold text-brand-teal">Student Progress</h4>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-brand-teal/10 bg-brand-teal/5 text-left text-xs font-semibold uppercase tracking-wider text-brand-teal/70">
                        <th className="px-4 py-3">Student</th>
                        <th className="px-4 py-3">Progress</th>
                        <th className="px-4 py-3">Last Accessed</th>
                        <th className="px-4 py-3">Certificate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-teal/10">
                      {courseDetail.studentProgress?.map(progress => (
                        <tr key={progress._id} className="hover:bg-brand-teal/5">
                          <td className="px-4 py-3">
                            <div className="font-medium text-brand-teal">{progress.student?.fullName}</div>
                            <div className="text-xs text-brand-teal/70">{progress.student?.email}</div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-28 overflow-hidden rounded-full bg-brand-teal/10">
                                <div className="h-full rounded-full bg-brand-orange" style={{ width: `${progress.progressPercentage}%` }} />
                              </div>
                              <span className="text-xs font-semibold text-brand-teal/80">{progress.progressPercentage}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-brand-teal/70">{new Date(progress.lastAccessedAt).toLocaleDateString()}</td>
                          <td className="px-4 py-3">
                            {progress.certificateSent ? (
                              <span className="rounded-full bg-brand-orange/15 px-2 py-1 text-xs font-semibold text-brand-orangeDark">Sent</span>
                            ) : (
                              <span className="rounded-full bg-brand-teal/10 px-2 py-1 text-xs font-semibold text-brand-teal">Pending</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {(!courseDetail.studentProgress || courseDetail.studentProgress.length === 0) && (
                    <p className="mt-4 text-center text-sm text-brand-teal/50">No student progress data yet</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Analytics;