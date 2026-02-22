import axiosInstance from './axios';

export const contentAPI = {
  getCourseContent: async (courseId) => {
    const response = await axiosInstance.get(`/content/course/${courseId}`);
    return response.data;
  },

  getContentById: async (id) => {
    const response = await axiosInstance.get(`/content/${id}`);
    return response.data;
  },

  createContent: async (contentData) => {
    const response = await axiosInstance.post('/content', contentData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  updateContent: async (id, contentData) => {
    const response = await axiosInstance.put(`/content/${id}`, contentData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  deleteContent: async (id) => {
    const response = await axiosInstance.delete(`/content/${id}`);
    return response.data;
  },
};