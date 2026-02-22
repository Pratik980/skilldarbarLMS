import axiosInstance from './axios';

export const progressAPI = {
  getCourseProgress: async (courseId) => {
    const response = await axiosInstance.get(`/progress/${courseId}`);
    return response.data;
  },

  completeContent: async (courseId, contentId) => {
    const response = await axiosInstance.put(`/progress/${courseId}/complete/${contentId}`);
    return response.data;
  },

  getAllProgress: async (studentId = '', courseId = '') => {
    let url = '/progress';
    const params = new URLSearchParams();
    if (studentId) params.append('studentId', studentId);
    if (courseId) params.append('courseId', courseId);
    if (params.toString()) url += `?${params.toString()}`;
    
    const response = await axiosInstance.get(url);
    return response.data;
  },

  sendCertificate: async (progressId) => {
    const response = await axiosInstance.put(`/progress/${progressId}/send-certificate`);
    return response.data;
  },

  downloadCertificate: async (progressId) => {
    try {
      const response = await axiosInstance.get(
        `/progress/${progressId}/download-certificate`,
        {
          responseType: 'blob',
        }
      );
      
      // Create blob and download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Certificate_${new Date().getTime()}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      return { success: true };
    } catch (error) {
      throw error;
    }
  },
};