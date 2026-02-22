import axiosInstance from './axios';

export const notificationAPI = {
  getMyNotifications: async (page = 1, limit = 20) => {
    const response = await axiosInstance.get(`/notifications?page=${page}&limit=${limit}`);
    return response.data;
  },

  markAsRead: async (id) => {
    const response = await axiosInstance.put(`/notifications/${id}/read`);
    return response.data;
  },

  markAllAsRead: async () => {
    const response = await axiosInstance.put('/notifications/read-all');
    return response.data;
  },

  deleteNotification: async (id) => {
    const response = await axiosInstance.delete(`/notifications/${id}`);
    return response.data;
  },

  createNotification: async (data) => {
    const response = await axiosInstance.post('/notifications', data);
    return response.data;
  },
};
