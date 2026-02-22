import axiosInstance from './axios';

export const adminAPI = {
  getDashboard: async () => {
    const response = await axiosInstance.get('/admin/dashboard');
    return response.data;
  },

  getAllUsers: async (role = '', isActive = '') => {
    let url = '/admin/users';
    const params = new URLSearchParams();
    if (role) params.append('role', role);
    if (isActive) params.append('isActive', isActive);
    if (params.toString()) url += `?${params.toString()}`;
    
    const response = await axiosInstance.get(url);
    return response.data;
  },

  toggleUserStatus: async (userId) => {
    const response = await axiosInstance.put(`/admin/users/${userId}/toggle-status`);
    return response.data;
  },

  getUserEnrollments: async (userId) => {
    const response = await axiosInstance.get(`/admin/users/${userId}/enrollments`);
    return response.data;
  },

  getCourseAnalytics: async (courseId) => {
    const response = await axiosInstance.get(`/admin/courses/${courseId}/analytics`);
    return response.data;
  },

  getAllCoursesAnalytics: async (search = '') => {
    const url = search ? `/admin/analytics/courses?search=${encodeURIComponent(search)}` : '/admin/analytics/courses';
    const response = await axiosInstance.get(url);
    return response.data;
  },

  getSettings: async () => {
    const response = await axiosInstance.get('/admin/settings');
    return response.data;
  },

  updateSettings: async (settingsData) => {
    const response = await axiosInstance.put('/admin/settings', settingsData);
    return response.data;
  },
};