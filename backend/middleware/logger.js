/**
 * Logger Middleware
 * Custom request logging middleware for API requests
 */

const morgan = require('morgan');

/**
 * Custom Morgan format for logging
 * Provides detailed request information in a structured format
 */
const customFormat = ':method :url :status :response-time ms - :date[clf]';

/**
 * Request Logger Middleware
 * Logs incoming HTTP requests with timestamp and details
 */
const requestLogger = morgan(customFormat, {
  stream: {
    write: (message) => {
      // Remove trailing newline and log the message
      console.log(`[API Request] ${message.trim()}`);
    }
  }
});

/**
 * Error Logger Middleware
 * Logs errors that occur during request processing
 */
const errorLogger = (err, req, res, next) => {
  // Log error details
  console.error('[ERROR]', {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    error: err.message,
    stack: err.stack
  });
  
  // Pass error to next middleware
  next(err);
};

/**
 * Success Logger Middleware
 * Logs successful responses
 */
const successLogger = (req, res, next) => {
  const originalSend = res.send;
  
  res.send = function(data) {
    // Log successful response
    if (res.statusCode >= 200 && res.statusCode < 300) {
      console.log('[SUCCESS]', {
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url,
        statusCode: res.statusCode,
        responseTime: Date.now() - req._startTime
      });
    }
    
    // Call original send method
    originalSend.call(this, data);
  };
  
  next();
};

module.exports = {
  requestLogger,
  errorLogger,
  successLogger
};