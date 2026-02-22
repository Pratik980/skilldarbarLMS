import { useState, useEffect } from 'react';
import { coursesAPI } from '../api/courses';
import { useAuth } from '../context/AuthContext';
import { getImageUrl, PLACEHOLDER } from '../utils/imageUrl';
import SafeImage from './SafeImage';
import toast from 'react-hot-toast';

const StarRating = ({ rating, onRate, interactive = false, size = 'text-xl' }) => {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          className={`${size} transition-colors ${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'}`}
          onMouseEnter={() => interactive && setHovered(star)}
          onMouseLeave={() => interactive && setHovered(0)}
          onClick={() => interactive && onRate(star)}
        >
          <span className={
            (hovered || rating) >= star
              ? 'text-yellow-400'
              : 'text-gray-300 dark:text-slate-600'
          }>
            ★
          </span>
        </button>
      ))}
    </div>
  );
};

const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
};

const ReviewSection = ({ courseId, isEnrolled }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(0);
  const [count, setCount] = useState(0);
  const [reviewEnabled, setReviewEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [myRating, setMyRating] = useState(0);
  const [myReview, setMyReview] = useState('');
  const [editing, setEditing] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [courseId]);

  const fetchReviews = async () => {
    try {
      const res = await coursesAPI.getCourseReviews(courseId);
      if (res.success) {
        setReviews(res.data.reviews);
        setAverage(res.data.average);
        setCount(res.data.count);
        setReviewEnabled(res.data.reviewEnabled);

        // Check if current user has already reviewed
        if (user) {
          const myExisting = res.data.reviews.find(
            r => r.user?._id === user._id || r.user === user._id
          );
          if (myExisting) {
            setHasReviewed(true);
            setMyRating(myExisting.rating);
            setMyReview(myExisting.review || '');
          }
        }
      }
    } catch (err) {
      // silent
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!myRating) {
      setError('Please select a rating');
      return;
    }
    setError('');
    setSuccess('');
    setSubmitting(true);

    try {
      if (hasReviewed && editing) {
        const res = await coursesAPI.updateReview(courseId, { rating: myRating, review: myReview });
        if (res.success) {
          toast.success('Review updated!');
          setSuccess('Review updated!');
          setEditing(false);
        }
      } else {
        const res = await coursesAPI.addReview(courseId, { rating: myRating, review: myReview });
        if (res.success) {
          toast.success('Review submitted!');
          setSuccess('Review submitted!');
          setHasReviewed(true);
        }
      }
      fetchReviews();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete your review?')) return;
    try {
      const res = await coursesAPI.deleteReview(courseId);
      if (res.success) {
        setHasReviewed(false);
        setMyRating(0);
        setMyReview('');
        setEditing(false);
        toast.success('Review deleted');
        setSuccess('Review deleted');
        fetchReviews();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete review');
    }
  };

  if (loading) {
    return (
      <div className="rounded-xl border border-white/10 bg-white p-6 shadow-lg shadow-black/5 dark:bg-slate-800 dark:border-slate-700">
        <div className="animate-pulse space-y-3">
          <div className="h-5 w-32 rounded bg-gray-200 dark:bg-slate-700"></div>
          <div className="h-4 w-48 rounded bg-gray-200 dark:bg-slate-700"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/10 bg-white p-6 shadow-lg shadow-black/5 dark:bg-slate-800 dark:border-slate-700 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-brand-teal dark:text-slate-200">
          Reviews & Ratings
        </h3>
        {count > 0 && (
          <div className="flex items-center gap-2">
            <StarRating rating={Math.round(average)} size="text-lg" />
            <span className="text-sm font-semibold text-brand-teal dark:text-slate-300">
              {average.toFixed(1)}
            </span>
            <span className="text-xs text-brand-teal/60 dark:text-slate-400">
              ({count} review{count !== 1 ? 's' : ''})
            </span>
          </div>
        )}
      </div>

      {!reviewEnabled && (
        <div className="rounded-lg border border-yellow-300/40 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-700 dark:text-yellow-300">
          Reviews are currently disabled for this course.
        </div>
      )}

      {/* Review Form */}
      {reviewEnabled && isEnrolled && user && (
        <div className="rounded-lg border border-brand-teal/10 bg-brand-teal/5 p-4 dark:bg-slate-700/50 dark:border-slate-600">
          {hasReviewed && !editing ? (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-brand-teal dark:text-slate-200">
                Your Review
              </p>
              <div className="flex items-center gap-2">
                <StarRating rating={myRating} size="text-lg" />
                <span className="text-sm text-brand-teal/70 dark:text-slate-400">
                  {myRating}/5
                </span>
              </div>
              {myReview && (
                <p className="text-sm text-brand-teal/80 dark:text-slate-300">{myReview}</p>
              )}
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => setEditing(true)}
                  className="text-xs font-semibold text-brand-orange hover:text-brand-orangeDark"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="text-xs font-semibold text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <p className="text-sm font-semibold text-brand-teal dark:text-slate-200">
                {editing ? 'Edit Your Review' : 'Write a Review'}
              </p>
              <div>
                <label className="text-xs text-brand-teal/70 dark:text-slate-400">Your Rating *</label>
                <StarRating rating={myRating} onRate={setMyRating} interactive size="text-2xl" />
              </div>
              <div>
                <label className="text-xs text-brand-teal/70 dark:text-slate-400">Your Review (optional)</label>
                <textarea
                  value={myReview}
                  onChange={(e) => setMyReview(e.target.value)}
                  rows={3}
                  placeholder="Share your experience with this course..."
                  className="mt-1 w-full rounded-lg border border-brand-teal/20 bg-white px-3 py-2 text-sm text-brand-teal focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200 dark:placeholder-slate-500"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:bg-brand-orangeDark disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : editing ? 'Update Review' : 'Submit Review'}
                </button>
                {editing && (
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="rounded-lg border border-brand-teal/20 bg-white px-4 py-2 text-sm font-semibold text-brand-teal hover:bg-brand-teal/5 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          )}

          {error && (
            <p className="mt-2 text-xs text-red-500">{error}</p>
          )}
          {success && (
            <p className="mt-2 text-xs text-green-600 dark:text-green-400">{success}</p>
          )}
        </div>
      )}

      {/* Average Rating Breakdown */}
      {count > 0 && (
        <div className="space-y-1">
          {[5, 4, 3, 2, 1].map((star) => {
            const starCount = reviews.filter(r => r.rating === star).length;
            const pct = count > 0 ? (starCount / count) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-2 text-xs">
                <span className="w-3 text-brand-teal/70 dark:text-slate-400">{star}</span>
                <span className="text-yellow-400">★</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-slate-700">
                  <div
                    className="h-full rounded-full bg-yellow-400 transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-8 text-right text-brand-teal/60 dark:text-slate-400">
                  {starCount}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((r, i) => (
            <div
              key={r._id || i}
              className="flex gap-3 border-t border-brand-teal/10 pt-4 dark:border-slate-700 first:border-0 first:pt-0"
            >
              <SafeImage
                src={getImageUrl(r.user?.profilePic, PLACEHOLDER.profile)}
                alt={r.user?.fullName || 'User'}
                className="h-9 w-9 shrink-0 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-brand-teal dark:text-slate-200">
                    {r.user?.fullName || 'Anonymous'}
                  </span>
                  <span className="text-xs text-brand-teal/50 dark:text-slate-500">
                    {timeAgo(r.createdAt)}
                  </span>
                </div>
                <StarRating rating={r.rating} size="text-sm" />
                {r.review && (
                  <p className="mt-1 text-sm text-brand-teal/80 dark:text-slate-300">
                    {r.review}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-brand-teal/60 dark:text-slate-400">
          No reviews yet. {isEnrolled && reviewEnabled ? 'Be the first to review!' : ''}
        </p>
      )}
    </div>
  );
};

export default ReviewSection;
