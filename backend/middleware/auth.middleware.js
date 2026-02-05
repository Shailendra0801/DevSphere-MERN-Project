/**
 * Authentication Middleware
 * Handles JWT verification and user authorization
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { ApiError } = require('./errorHandler');

/**
 * Protect route middleware
 * Verifies JWT token and attaches user to request
 */
const protect = async (req, res, next) => {
  try {
    // 1. Get token from header
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    // 2. Check if token exists
    if (!token) {
      return next(new ApiError(401, 'Access denied. No token provided.'));
    }
    
    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 4. Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new ApiError(401, 'The user belonging to this token no longer exists.'));
    }
    
    // 5. Check if user is active
    if (!currentUser.isActive) {
      return next(new ApiError(401, 'This account has been deactivated.'));
    }
    
    // 6. Check if token is blacklisted
    if (currentUser.isTokenBlacklisted(token)) {
      return next(new ApiError(401, 'Token has been invalidated. Please log in again.'));
    }
    
    // 7. Check if user changed password after token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(new ApiError(401, 'User recently changed password. Please log in again.'));
    }
    
    // 8. Grant access to protected route
    req.user = currentUser;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return next(new ApiError(401, 'Invalid token.'));
    }
    
    if (error.name === 'TokenExpiredError') {
      return next(new ApiError(401, 'Token expired.'));
    }
    
    return next(new ApiError(401, 'Not authorized to access this route.'));
  }
};

/**
 * Restrict to roles middleware
 * Restricts access to certain roles
 */
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, 'Access denied. Please log in.'));
    }
    
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, 'Access denied. Insufficient permissions.'));
    }
    
    next();
  };
};

/**
 * Advanced rate limiting middleware
 * Prevents brute force attacks
 */
const rateLimit = require('rate-limiter-flexible');

const loginRateLimiter = new rateLimit.RateLimiterMemory({
  points: 5, // 5 attempts
  duration: 15 * 60, // 15 minutes
});

const passwordResetRateLimiter = new rateLimit.RateLimiterMemory({
  points: 3, // 3 attempts
  duration: 60 * 60, // 1 hour
});

const genericRateLimiter = new rateLimit.RateLimiterMemory({
  points: 100, // 100 requests
  duration: 15 * 60, // 15 minutes
});

/**
 * Rate limiting middleware for login attempts
 */
const loginLimiter = async (req, res, next) => {
  try {
    const ip = req.ip || req.connection.remoteAddress;
    await loginRateLimiter.consume(ip);
    next();
  } catch (rateLimiterRes) {
    return next(new ApiError(429, 'Too many login attempts. Please try again later.'));
  }
};

/**
 * Rate limiting middleware for password reset requests
 */
const passwordResetLimiter = async (req, res, next) => {
  try {
    const ip = req.ip || req.connection.remoteAddress;
    await passwordResetRateLimiter.consume(ip);
    next();
  } catch (rateLimiterRes) {
    return next(new ApiError(429, 'Too many password reset requests. Please try again later.'));
  }
};

/**
 * Generic rate limiting middleware
 */
const genericLimiter = async (req, res, next) => {
  try {
    const ip = req.ip || req.connection.remoteAddress;
    await genericRateLimiter.consume(ip);
    next();
  } catch (rateLimiterRes) {
    return next(new ApiError(429, 'Too many requests. Please try again later.'));
  }
};

/**
 * Security headers middleware
 * Adds security-related HTTP headers
 */
const securityHeaders = (req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
};

/**
 * Optional auth middleware
 * Attaches user to request if token is valid, but doesn't require authentication
 */
const optionalAuth = async (req, res, next) => {
  try {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const currentUser = await User.findById(decoded.id);
      
      if (currentUser && currentUser.isActive && !currentUser.isTokenBlacklisted(token)) {
        req.user = currentUser;
      }
    }
    
    next();
  } catch (error) {
    // Silently continue without user if token is invalid
    next();
  }
};

module.exports = {
  protect,
  optionalAuth,
  restrictTo,
  loginLimiter,
  passwordResetLimiter,
  genericLimiter,
  securityHeaders
};