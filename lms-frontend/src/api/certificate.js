import axios from './axios';

export const certificateAPI = {
  // Get certificate by course ID
  getCertificate: async (courseId) => {
    const response = await axios.get(`/certificates/course/${courseId}`);
    return response.data;
  },

  // Download certificate PDF
  downloadCertificate: async (courseId) => {
    const response = await axios.get(`/certificates/course/${courseId}/download`, {
      responseType: 'blob',
    });
    return response;
  },

  // Get student certificates
  getStudentCertificates: async () => {
    const response = await axios.get('/certificates');
    return response.data;
  },

  // Get all certificates (admin)
  getAllCertificates: async () => {
    const response = await axios.get('/certificates/admin/all');
    return response.data;
  },
};
