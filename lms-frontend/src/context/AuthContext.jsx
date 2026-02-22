import { createContext, useState, useEffect, useContext } from 'react';
import { authAPI } from '../api/auth';

const AuthContext = createContext();

// Export the context so it can be used in other files
export { AuthContext };

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      validateToken();
    } else {
      setLoading(false);
    }
  }, []);

  const validateToken = async () => {
    try {
      const response = await authAPI.getMe();
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (err) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const response = await authAPI.login({ email, password });

      if (response.success) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
        return { success: true, user: response.user };
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      return { success: false, error: err.response?.data?.message };
    }
  };

  const signup = async (userData) => {
    try {
      setError(null);
      const response = await authAPI.signup(userData);

      if (response.success) {
        // Don't store token/user here - let user login explicitly after signup
        return { success: true };
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
      return { success: false, error: err.response?.data?.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateUser = async (userData) => {
    try {
      const response = await authAPI.updateProfile(userData);
      if (response.success) {
        const updatedUser = { ...user, ...response.data };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return { success: true };
      }
    } catch (err) {
      return { success: false, error: err.response?.data?.message };
    }
  };

  const updateProfileImage = (newImageUrl) => {
    if (!user) return;
    const updatedUser = { ...user, profileImage: newImageUrl };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };


  const changePassword = async (passwordData) => {
    try {
      const response = await authAPI.changePassword(passwordData);
      if (response.success) {
        return { success: true };
      }
      return { success: false, error: response.message };
    } catch (err) {
      return { success: false, error: err.response?.data?.message };
    }
  };

  const value = {
    user,
    setUser,
    loading,
    error,
    login,
    signup,
    logout,
    updateUser,
    updateProfileImage,
    changePassword,

    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isStudent: user?.role === 'student',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};