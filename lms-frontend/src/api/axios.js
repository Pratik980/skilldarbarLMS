import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Request interceptor to add token and handle content type
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Set Content-Type based on data type
    if (config.data instanceof FormData) {
      // Let browser set the Content-Type with boundary for multipart/form-data
      // Don't set Content-Type header
    } else {
      // Default to JSON for other requests
      config.headers['Content-Type'] = 'application/json';
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Only redirect to login if the user is on a protected route
      // Don't redirect from public pages, login, or signup
      const publicPaths = ['/', '/about', '/courses', '/blog', '/careers', '/faqs', '/pricing', '/contact', '/login', '/signup'];
      const currentPath = window.location.pathname;
      const isPublicPage = publicPaths.includes(currentPath);
      
      if (!isPublicPage) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;