import axiosInstance from './axios';

export const coursesAPI = {
  getAllCourses: async () => {
    const response = await axiosInstance.get('/courses');
    return response.data;
  },

  getCourseById: async (id) => {
    const response = await axiosInstance.get(`/courses/${id}`);
    return response.data;
  },

  createCourse: async (courseData) => {
    const response = await axiosInstance.post('/courses', courseData);
    return response.data;
  },

  updateCourse: async (id, courseData) => {
    const response = await axiosInstance.put(`/courses/${id}`, courseData);
    return response.data;
  },

  deleteCourse: async (id) => {
    const response = await axiosInstance.delete(`/courses/${id}`);
    return response.data;
  },

  toggleCourseStatus: async (id) => {
    const response = await axiosInstance.patch(`/courses/${id}/toggle-status`);
    return response.data;
  },

  getCourseReviews: async (courseId) => {
    const response = await axiosInstance.get(`/courses/${courseId}/reviews`);
    return response.data;
  },

  addReview: async (courseId, data) => {
    const response = await axiosInstance.post(`/courses/${courseId}/reviews`, data);
    return response.data;
  },

  updateReview: async (courseId, data) => {
    const response = await axiosInstance.put(`/courses/${courseId}/reviews`, data);
    return response.data;
  },

  deleteReview: async (courseId) => {
    const response = await axiosInstance.delete(`/courses/${courseId}/reviews`);
    return response.data;
  },
};