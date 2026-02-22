// Utility to construct proper image URLs from backend paths
// Uses VITE_API_URL to derive the server base URL

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// Remove /api suffix to get base server URL
export const SERVER_URL = API_URL.replace(/\/api\/?$/, '');

/**
 * Get the full image URL for a backend file path
 * @param {string} path - The file path from backend (e.g., "uploads/images/abc.jpg")
 * @param {string} fallback - Fallback image URL if path is empty/null
 * @returns {string} Full URL to the image
 */
export const getImageUrl = (path, fallback = '/placeholder-image.svg') => {
  if (!path) return fallback;
  
  // If it's already a full URL (http/https), return as-is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Strip leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  return `${SERVER_URL}/${cleanPath}`;
};

/**
 * Get YouTube thumbnail from a YouTube URL
 * @param {string} url - YouTube video URL
 * @returns {string|null} Thumbnail URL or null
 */
export const getYouTubeThumbnail = (url) => {
  if (!url) return null;
  
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  
  if (match && match[2].length === 11) {
    return `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`;
  }
  
  return null;
};

/**
 * Default placeholder images
 */
export const PLACEHOLDER = {
  course: '/placeholder-course.svg',
  profile: '/placeholder-profile.svg',
  qr: '/placeholder-qr.svg',
};
