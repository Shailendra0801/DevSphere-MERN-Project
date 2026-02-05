/**
 * Authentication Routes
 * All routes related to user authentication
 */

const express = require('express');
const router = express.Router();

// Import controllers
const authController = require('../controllers/auth.controller');

// Import middleware
const { protect } = require('../middleware/auth.middleware');
const {
  validateRegistration,
  validateLogin,
  validatePasswordResetRequest,
  validatePasswordReset,
  validatePasswordUpdate,
  validateEmailVerification,
  validateResendVerification,
  validateRefreshToken
} = require('../middleware/auth.validation');

/**
 * @desc    Register a new user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
router.post('/register', validateRegistration, authController.register);

/**
 * @desc    Login user
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
router.post('/login', validateLogin, authController.login);

/**
 * @desc    Logout user
 * @route   POST /api/v1/auth/logout
 * @access  Private
 */
router.post('/logout', protect, authController.logout);

/**
 * @desc    Refresh access token
 * @route   POST /api/v1/auth/refresh-token
 * @access  Public
 */
router.post('/refresh-token', validateRefreshToken, authController.refreshToken);

/**
 * @desc    Get current user profile
 * @route   GET /api/v1/auth/me
 * @access  Private
 */
router.get('/me', protect, authController.getMe);

/**
 * @desc    Update user password
 * @route   PATCH /api/v1/auth/update-password
 * @access  Private
 */
router.patch('/update-password', protect, validatePasswordUpdate, authController.updatePassword);

/**
 * @desc    Forgot password
 * @route   POST /api/v1/auth/forgot-password
 * @access  Public
 */
router.post('/forgot-password', validatePasswordResetRequest, authController.forgotPassword);

/**
 * @desc    Reset password
 * @route   PATCH /api/v1/auth/reset-password/:token
 * @access  Public
 */
router.patch('/reset-password/:token', validatePasswordReset, authController.resetPassword);

/**
 * @desc    Verify email
 * @route   GET /api/v1/auth/verify-email/:token
 * @access  Public
 */
router.get('/verify-email/:token', validateEmailVerification, authController.verifyEmail);

/**
 * @desc    Resend email verification
 * @route   POST /api/v1/auth/resend-verification
 * @access  Public
 */
router.post('/resend-verification', validateResendVerification, authController.resendVerification);

module.exports = router;