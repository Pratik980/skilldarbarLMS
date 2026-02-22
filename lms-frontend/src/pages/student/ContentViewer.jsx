import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { contentAPI } from '../../api/content';
import { progressAPI } from '../../api/progress';
import LoadingSpinner from '../../components/LoadingSpinner';
import { getImageUrl } from '../../utils/imageUrl';

const ContentViewer = () => {
  const { courseId, contentId } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    fetchContent();
  }, [contentId]);

  const fetchContent = async () => {
    try {
      const response = await contentAPI.getContentById(contentId);
      setContent(response.data);
      
      // Check if already completed
      const progressRes = await progressAPI.getCourseProgress(courseId);
      const isCompleted = progressRes.data.completedContents.some(
        c => c._id === contentId
      );
      setCompleted(isCompleted);
    } catch (err) {
      setError('Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkComplete = async () => {
    try {
      await progressAPI.completeContent(courseId, contentId);
      setCompleted(true);
    } catch (err) {
      setError('Failed to mark as complete');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!content) return <div>Content not found</div>;

  const getYouTubeEmbedUrl = (url) => {
    try {
      const parsed = new URL(url);
      const host = parsed.hostname.replace(/^www\./, '');
      let videoId = '';

      if (host === 'youtu.be') {
        videoId = parsed.pathname.slice(1);
      } else if (host.endsWith('youtube.com')) {
        if (parsed.pathname === '/watch') {
          videoId = parsed.searchParams.get('v') || '';
        } else if (parsed.pathname.startsWith('/embed/')) {
          videoId = parsed.pathname.replace('/embed/', '');
        } else if (parsed.pathname.startsWith('/shorts/')) {
          videoId = parsed.pathname.replace('/shorts/', '');
        } else if (parsed.pathname.startsWith('/live/')) {
          videoId = parsed.pathname.replace('/live/', '');
        }
      }

      if (!videoId) {
        return null;
      }

      return `https://www.youtube.com/embed/${videoId}`;
    } catch (err) {
      return null;
    }
  };

  const renderContent = () => {
    switch (content.type) {
      case 'video':
        return (
          <video controls className="w-full rounded-xl border border-brand-teal/10 bg-black">
            <source src={getImageUrl(content.filePath)} />
            Your browser does not support the video tag.
          </video>
        );
      
      case 'pdf':
        return (
          <iframe
            src={getImageUrl(content.filePath)}
            className="h-[70vh] w-full rounded-xl border border-brand-teal/10"
            title={content.title}
          />
        );
      
      case 'image':
        if (content.slideImages && content.slideImages.length > 0) {
          return (
            <div className="space-y-4">
              {content.slideImages.map((imgPath, index) => (
                <img
                  key={imgPath}
                  src={getImageUrl(imgPath)}
                  alt={`${content.title} - Slide ${index + 1}`}
                  className="w-full rounded-xl border border-brand-teal/10"
                />
              ))}
            </div>
          );
        }
        return (
          <img
            src={getImageUrl(content.filePath)}
            alt={content.title}
            className="w-full rounded-xl border border-brand-teal/10"
          />
        );
      
      case 'link':
        return (
          <div className="rounded-xl border border-brand-teal/10 bg-white p-6 text-center">
            <a 
              href={content.externalLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:bg-brand-orangeDark"
            >
              Open External Link
            </a>
          </div>
        );

      case 'youtube': {
        const embedUrl = getYouTubeEmbedUrl(content.externalLink);
        if (!embedUrl) {
          return (
            <div className="rounded-xl border border-brand-teal/10 bg-white p-6 text-center">
              <p className="text-sm text-brand-teal/70">Invalid YouTube URL</p>
              <a
                href={content.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:bg-brand-orangeDark"
              >
                Open YouTube Video
              </a>
            </div>
          );
        }

        return (
          <iframe
            className="h-[70vh] w-full rounded-xl border border-brand-teal/10"
            src={embedUrl}
            title={content.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        );
      }
      
      default:
        return <p>Unsupported content type</p>;
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1 text-sm font-medium text-brand-teal/70 hover:text-brand-teal transition-colors dark:text-slate-400 dark:hover:text-slate-200">
        ← Back to Course
      </button>

      {error && (
        <div className="rounded-lg border border-red-300/40 bg-red-500/15 px-4 py-3 text-sm text-red-100">
          {error}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold text-brand-orange">{content.title}</h2>
        <span className="rounded-full bg-brand-teal/10 px-3 py-1 text-xs font-semibold text-brand-teal capitalize">{content.type}</span>
      </div>

      {content.description && (
        <p className="text-sm text-brand-teal/70">{content.description}</p>
      )}

      <div>
        {renderContent()}
      </div>

      {!completed && (
        <button 
          onClick={handleMarkComplete}
          className="rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:bg-brand-orangeDark"
        >
          Mark as Completed
        </button>
      )}

      {completed && (
        <div className="rounded-lg border border-brand-orange/30 bg-brand-orange/10 px-4 py-3 text-sm font-semibold text-brand-orangeDark">
          ✓ You have completed this content
        </div>
      )}
    </div>
  );
};

export default ContentViewer;