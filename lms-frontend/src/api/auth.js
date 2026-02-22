import axiosInstance from './axios';

export const authAPI = {
  signup: async (userData) => {
    const response = await axiosInstance.post('/auth/signup', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await axiosInstance.post('/auth/login', credentials);
    return response.data;
  },

  getMe: async () => {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await axiosInstance.put('/auth/update-profile', userData);
    return response.data;
  },

  uploadProfileImage: async (imageFile) => {
    const formData = new FormData();
    formData.append('profileImage', imageFile);
    
    console.log('=== Frontend: Uploading Profile Image ===');
    console.log('File:', imageFile);
    console.log('FormData entries:', Array.from(formData.entries()));
    
    const response = await axiosInstance.post('/auth/upload-profile-image', formData);
    return response.data;
  },

  changePassword: async (passwordData) => {
    const response = await axiosInstance.put('/auth/change-password', passwordData);
    return response.data;
  },
};