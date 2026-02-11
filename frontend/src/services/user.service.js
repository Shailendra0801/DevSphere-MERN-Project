import axios from '../lib/axios';

/**
 * User Service
 * Handles all user-related API calls (profile updates, etc.)
 */
class UserService {
  // Update user profile
  async updateProfile(userData) {
    try {
      const response = await axios.patch('/api/v1/auth/update-me', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: error.message };
    }
  }

  // Update user password
  async updatePassword(currentPassword, newPassword) {
    try {
      const response = await axios.patch('/api/v1/auth/update-password', {
        currentPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: error.message };
    }
  }

  // Upload avatar
  async uploadAvatar(file) {
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      
      const response = await axios.patch('/api/v1/auth/update-avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: error.message };
    }
  }

  // Delete account
  async deleteAccount(password) {
    try {
      const response = await axios.delete('/api/v1/auth/delete-me', {
        data: { password }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: error.message };
    }
  }
}

export default new UserService();