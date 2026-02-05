/**
 * Authentication Controller
 * Handles all authentication-related business logic
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { ApiError, asyncHandler } = require('../middleware/errorHandler');
const { sendEmail } = require('../utils/email');

/**
 * Generate JWT Token
 * Creates a signed JWT token for user authentication
 */
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '15m' // Short-lived access token
  });
};

/**
 * Generate Refresh Token
 * Creates a long-lived refresh token
 */
const generateRefreshToken = (user) => {
  return user.createRefreshToken();
};

/**
 * Create and send token response
 * Generates JWT and refresh tokens and sends response
 */
const createSendToken = async (user, statusCode, res, sendRefreshToken = true) => {
  const accessToken = signToken(user._id);
  let refreshToken = null;
  
  if (sendRefreshToken) {
    refreshToken = generateRefreshToken(user);
    await user.save({ validateBeforeSave: false });
  }
  
  // Remove sensitive data from output
  user.password = undefined;
  
  // Cookie options
  const cookieOptions = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  };
  
  // Send refresh token in cookie if requested
  if (sendRefreshToken && refreshToken) {
    res.cookie('refreshToken', refreshToken, cookieOptions);
  }
  
  res.status(statusCode).json({
    status: 'success',
    accessToken,
    ...(sendRefreshToken && refreshToken ? { refreshToken } : {}),
    data: {
      user: user.getPublicProfile()
    }
  });
};

/**
 * @desc    Register new user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ApiError(400, 'User with this email already exists'));
  }
  
  // Create user
  const user = await User.create({
    name,
    email,
    password
  });
  
  // Generate email verification token
  const verificationToken = user.createEmailVerificationToken();
  await user.save({ validateBeforeSave: false });
  
  // Send welcome email with verification link
  try {
    const verificationURL = `${req.protocol}://${req.get('host')}/api/v1/auth/verify-email/${verificationToken}`;
    
    await sendEmail({
      email: user.email,
      subject: 'Welcome to DevSphere! Please verify your email',
      message: `
        <h2>Welcome to DevSphere!</h2>
        <p>Hello ${user.name},</p>
        <p>Thank you for registering with DevSphere. Please verify your email address by clicking the link below:</p>
        <a href="${verificationURL}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email</a>
        <p>This link will expire in 24 hours.</p>
        <p>If you didn't create an account, please ignore this email.</p>
      `
    });
  } catch (error) {
    // Don't fail registration if email sending fails
    console.error('Email sending failed:', error);
  }
  
  // Create and send token
  createSendToken(user, 201, res);
});

/**
 * @desc    Login user
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password, rememberMe = false } = req.body;
  
  // Check if email and password exist
  if (!email || !password) {
    return next(new ApiError(400, 'Please provide email and password'));  
  }
  
  // Check if user exists and password is correct
  const user = await User.findByEmailWithSecurity(email);
  
  if (!user || !(await user.comparePassword(password))) {
    // Increment login attempts for security
    if (user) {
      await user.incrementLoginAttempts();
    }
    return next(new ApiError(401, 'Incorrect email or password'));
  }
  
  // Check if account is locked
  if (user.isLocked) {
    return next(new ApiError(401, 'Account temporarily locked due to too many failed login attempts. Please try again later.'));
  }
  
  // Reset login attempts
  await user.resetLoginAttempts();
  
  // Update last login
  user.lastLogin = Date.now();
  await user.save({ validateBeforeSave: false });
  
  // Create and send tokens
  await createSendToken(user, 200, res, rememberMe);
});

/**
 * @desc    Logout user
 * @route   POST /api/v1/auth/logout
 * @access  Private
 */
exports.logout = asyncHandler(async (req, res, next) => {
  try {
    // Blacklist current access token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      const token = req.headers.authorization.split(' ')[1];
      req.user.blacklistToken(token);
    }
    
    // Clear refresh token
    req.user.clearRefreshToken();
    await req.user.save({ validateBeforeSave: false });
    
    // Clear refresh token cookie
    res.clearCookie('refreshToken');
    
    res.status(200).json({
      status: 'success',
      message: 'Logged out successfully'
    });
  } catch (error) {
    return next(new ApiError(500, 'Error during logout process'));
  }
});

/**
 * @desc    Refresh access token
 * @route   POST /api/v1/auth/refresh-token
 * @access  Public
 */
exports.refreshToken = asyncHandler(async (req, res, next) => {
  try {
    // Get refresh token from cookie or body
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
    
    if (!refreshToken) {
      return next(new ApiError(401, 'No refresh token provided'));
    }
    
    // Find user by refresh token
    const user = await User.findByRefreshToken(refreshToken);
    
    if (!user) {
      return next(new ApiError(401, 'Invalid refresh token'));
    }
    
    // Check if user is active
    if (!user.isActive) {
      return next(new ApiError(401, 'Account has been deactivated'));
    }
    
    // Generate new access token
    const newAccessToken = signToken(user._id);
    
    // Remove password from output
    user.password = undefined;
    
    res.status(200).json({
      status: 'success',
      accessToken: newAccessToken,
      data: {
        user: user.getPublicProfile()
      }
    });
  } catch (error) {
    return next(new ApiError(401, 'Invalid refresh token'));
  }
});

/**
 * @desc    Get current user profile
 * @route   GET /api/v1/auth/me
 * @access  Private
 */
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  
  res.status(200).json({
    status: 'success',
    data: {
      user: user.getPublicProfile()
    }
  });
});

/**
 * @desc    Update user password
 * @route   PATCH /api/v1/auth/update-password
 * @access  Private
 */
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  
  // Get user from collection
  const user = await User.findByEmailWithSecurity(req.user.email);
  
  // Check if posted current password is correct
  if (!(await user.comparePassword(currentPassword))) {
    return next(new ApiError(401, 'Your current password is wrong'));
  }
  
  // Update password
  user.password = newPassword;
  await user.save();
  
  // Create and send new token
  createSendToken(user, 200, res);
});

/**
 * @desc    Forgot password
 * @route   POST /api/v1/auth/forgot-password
 * @access  Public
 */
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  // Get user based on posted email
  const user = await User.findByEmailWithSecurity(req.body.email);
  
  if (!user) {
    return next(new ApiError(404, 'There is no user with that email address'));
  }
  
  // Generate random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  
  // Send it to user's email
  try {
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/auth/reset-password/${resetToken}`;
    
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 minutes)',
      message: `
        <h2>Password Reset Request</h2>
        <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
        <p>Please click on the following link, or paste this into your browser to complete the process:</p>
        <a href="${resetURL}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
        <p>This link will expire in 10 minutes.</p>
      `
    });
    
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!'
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    
    return next(new ApiError(500, 'There was an error sending the email. Try again later!'));
  }
});

/**
 * @desc    Reset password
 * @route   PATCH /api/v1/auth/reset-password/:token
 * @access  Public
 */
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get user based on token
  const hashedToken = require('crypto').createHash('sha256').update(req.params.token).digest('hex');
  
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });
  
  // If token has not expired and there is user, set new password
  if (!user) {
    return next(new ApiError(400, 'Token is invalid or has expired'));
  }
  
  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  
  // Update changedPasswordAt property for current user
  
  // Log the user in, send JWT
  createSendToken(user, 200, res);
});

/**
 * @desc    Verify email
 * @route   GET /api/v1/auth/verify-email/:token
 * @access  Public
 */
exports.verifyEmail = asyncHandler(async (req, res, next) => {
  const hashedToken = require('crypto').createHash('sha256').update(req.params.token).digest('hex');
  
  const user = await User.findOne({
    emailVerificationToken: hashedToken
  });
  
  if (!user) {
    return next(new ApiError(400, 'Token is invalid or has expired'));
  }
  
  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  await user.save({ validateBeforeSave: false });
  
  res.status(200).json({
    status: 'success',
    message: 'Email verified successfully!'
  });
});

/**
 * @desc    Resend email verification
 * @route   POST /api/v1/auth/resend-verification
 * @access  Public
 */
exports.resendVerification = asyncHandler(async (req, res, next) => {
  const user = await User.findByEmailWithSecurity(req.body.email);
  
  if (!user) {
    return next(new ApiError(404, 'There is no user with that email address'));
  }
  
  if (user.isEmailVerified) {
    return next(new ApiError(400, 'Email is already verified'));
  }
  
  // Generate new verification token
  const verificationToken = user.createEmailVerificationToken();
  await user.save({ validateBeforeSave: false });
  
  // Send verification email
  try {
    const verificationURL = `${req.protocol}://${req.get('host')}/api/v1/auth/verify-email/${verificationToken}`;
    
    await sendEmail({
      email: user.email,
      subject: 'Verify your email for DevSphere',
      message: `
        <h2>Email Verification</h2>
        <p>Hello ${user.name},</p>
        <p>Please verify your email address by clicking the link below:</p>
        <a href="${verificationURL}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email</a>
        <p>This link will expire in 24 hours.</p>
      `
    });
    
    res.status(200).json({
      status: 'success',
      message: 'Verification email sent!'
    });
  } catch (error) {
    return next(new ApiError(500, 'There was an error sending the email. Try again later!'));
  }
});