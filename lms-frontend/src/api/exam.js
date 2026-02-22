import axios from './axios';

export const examAPI = {
  // Get exam by course ID
  getExamByCourse: async (courseId) => {
    const response = await axios.get(`/exams/course/${courseId}`);
    return response.data;
  },

  // Get exam by exam ID (admin)
  getExamById: async (examId) => {
    const response = await axios.get(`/exams/${examId}`);
    return response.data;
  },

  // Get exam for taking (without answers)
  getExamForTaking: async (courseId) => {
    const response = await axios.get(`/exams/take/${courseId}`);
    return response.data;
  },

  // Submit exam answers
  submitExam: async (courseId, answers) => {
    const response = await axios.post(`/exams/${courseId}/submit`, { answers });
    return response.data;
  },

  // Create exam (admin)
  createExam: async (examData) => {
    const response = await axios.post('/exams', examData);
    return response.data;
  },

  // Update exam (admin)
  updateExam: async (examId, examData) => {
    const response = await axios.patch(`/exams/${examId}`, examData);
    return response.data;
  },

  // Delete exam (admin)
  deleteExam: async (examId) => {
    const response = await axios.delete(`/exams/${examId}`);
    return response.data;
  },

  // Get exam results (admin)
  getExamResults: async (courseId) => {
    const response = await axios.get(`/exams/admin/${courseId}/results`);
    return response.data;
  },
};
