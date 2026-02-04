/**
 * Global Error Handler Middleware
 * Centralized error handling for the application
 */

/**
 * Custom API Error Class
 * Extends built-in Error class with additional properties
 */
class ApiError extends Error {
  constructor(statusCode, message, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Global Error Handling Middleware
 * Catches all unhandled errors and sends standardized responses
 */
const globalErrorHandler = (err, req, res, next) => {
  // Set default error values
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  err.message = err.message || 'Something went wrong!';

  // Log error details
  console.error('Global Error Handler:', {
    timestamp: new Date().toISOString(),
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method
  });

  // Send error response based on environment
  if (process.env.NODE_ENV === 'development') {
    // Detailed error response for development
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  } else {
    // Simplified error response for production
    // Only send operational errors to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    } else {
      // For programming errors, send generic message
      return res.status(500).json({
        status: 'error',
        message: 'Something went wrong!'
      });
    }
  }
};

/**
 * Async Error Wrapper
 * Wraps async route handlers to catch async errors
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * 404 Handler Middleware
 * Handles routes that don't exist
 */
const notFoundHandler = (req, res, next) => {
  const error = new ApiError(404, `Route ${req.originalUrl} not found`);
  next(error);
};

/**
 * Validation Error Handler
 * Handles Mongoose validation errors
 */
const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new ApiError(400, message);
};

/**
 * Duplicate Key Error Handler
 * Handles MongoDB duplicate key errors
 */
const handleDuplicateKeyError = (err) => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new ApiError(400, message);
};

/**
 * Cast Error Handler
 * Handles Mongoose cast errors (invalid ObjectId)
 */
const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new ApiError(400, message);
};

module.exports = {
  ApiError,
  globalErrorHandler,
  asyncHandler,
  notFoundHandler,
  handleValidationError,
  handleDuplicateKeyError,
  handleCastError
};