import axiosInstance from './axios';

export const enrollmentsAPI = {
  getMyEnrollments: async () => {
    const response = await axiosInstance.get('/enrollments/my-enrollments');
    return response.data;
  },

  enrollCourse: async (courseId, enrollmentData) => {
    const response = await axiosInstance.post(`/enrollments/${courseId}`, enrollmentData);
    return response.data;
  },

  markAsPaid: async (enrollmentId) => {
    const response = await axiosInstance.put(`/enrollments/${enrollmentId}/mark-paid`);
    return response.data;
  },

  getAllEnrollments: async (status = '') => {
    const url = status ? `/enrollments?status=${status}` : '/enrollments';
    const response = await axiosInstance.get(url);
    return response.data;
  },

  approveEnrollment: async (enrollmentId) => {
    const response = await axiosInstance.put(`/enrollments/${enrollmentId}/approve`);
    return response.data;
  },

  rejectEnrollment: async (enrollmentId) => {
    const response = await axiosInstance.put(`/enrollments/${enrollmentId}/reject`);
    return response.data;
  },
};