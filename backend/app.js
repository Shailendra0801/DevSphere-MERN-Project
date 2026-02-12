/**
 * Express Application Configuration
 * Main application setup with middleware and routes
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

// Import custom middleware
const { requestLogger, errorLogger, successLogger } = require('./middleware/logger');
const { globalErrorHandler, notFoundHandler } = require('./middleware/errorHandler');
const { securityHeaders, genericLimiter } = require('./middleware/auth.middleware');

// Import routes
const apiRoutes = require('./routes/api');
const healthRoutes = require('./routes/health');
const authRoutes = require('./routes/auth.routes');

/**
 * Create Express application
 */
const app = express();

/**
 * Middleware Configuration
 */

// Security middleware
app.use(helmet());
app.use(securityHeaders);

// Enable CORS with options (MUST be before rate limiting)
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL || 'https://yourdomain.com'
    : [
        'http://localhost:3000', 
        'http://127.0.0.1:3000', 
        'http://localhost:5173', 
        'http://localhost:5174',
        'http://localhost:4173'
      ],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'x-request-id', 'Accept']
};

app.use(cors(corsOptions));

// Rate limiting (after CORS to allow preflight requests)
app.use(genericLimiter);

// Built-in middleware
app.use(cookieParser());                    // Parse cookies
app.use(express.json({ limit: '10mb' }));           // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));    // Parse URL-encoded bodies

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Request logging middleware (only in development)
if (process.env.NODE_ENV === 'development') {
  app.use(requestLogger);
}

// Success logging middleware
app.use(successLogger);

// Error logging middleware
app.use(errorLogger);

/**
 * Route Configuration
 */

// API Routes
app.use('/api', apiRoutes);

// Authentication routes
app.use('/api/v1/auth', authRoutes);

// Health check routes
app.use('/api/health', healthRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to DevSphere MERN Project API',
    version: '1.0.0',
    documentation: '/api/docs' // Placeholder for future API docs
  });
});

// API Documentation route (placeholder)
app.get('/api/docs', (req, res) => {
  res.json({ 
    message: 'API Documentation coming soon',
    endpoints: {
      health: '/api/health',
      users: '/api/users',
      docs: '/api/docs'
    }
  });
});

/**
 * Error Handling
 */

// 404 handler for undefined routes
app.use(notFoundHandler);

// Global error handler (must be last middleware)
app.use(globalErrorHandler);

module.exports = app;