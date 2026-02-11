import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { X, User, Save, Loader2 } from 'lucide-react';
import userService from '../../../services/user.service';
import { useAuth } from '../../../hooks/useAuth';
import styles from './EditProfileModal.module.css';

const EditProfileModal = ({ isOpen, onClose, user, onUpdate }) => {
  const { refreshUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate form
      if (!formData.name.trim()) {
        throw new Error('Name is required');
      }

      if (!formData.email.trim()) {
        throw new Error('Email is required');
      }

      // Update profile
      const response = await userService.updateProfile({
        name: formData.name.trim(),
        email: formData.email.trim()
      });

      // Refresh user data
      await refreshUser();
      
      // Notify parent component
      if (onUpdate) {
        onUpdate(response.data?.user || response.data);
      }

      // Close modal
      onClose();
    } catch (err) {
      console.error('Profile update error:', err);
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  // Reset form when modal opens/closes
  React.useEffect(() => {
    if (isOpen && user) {
      setFormData({
        name: user.name || '',
        email: user.email || ''
      });
      setError('');
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <div className={styles.headerContent}>
            <User className={styles.headerIcon} />
            <h2 className={styles.modalTitle}>Edit Profile</h2>
          </div>
          <button
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close modal"
            disabled={loading}
          >
            <X className={styles.closeIcon} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && (
            <div className={styles.errorMessage}>
              <span>{error}</span>
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter your full name"
              required
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.saveButton}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className={`${styles.spinner} ${styles.spinning}`} />
                  Saving...
                </>
              ) : (
                <>
                  <Save className={styles.buttonIcon} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object,
  onUpdate: PropTypes.func
};

export default EditProfileModal;