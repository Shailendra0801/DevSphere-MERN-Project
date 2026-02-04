/**
 * Health Check Routes
 * Endpoints for monitoring application health and status
 */

const express = require('express');
const router = express.Router();

/**
 * @route   GET /api/health
 * @desc    Health check endpoint
 * @access  Public
 */
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

/**
 * @route   GET /api/health/database
 * @desc    Database connection health check
 * @access  Public
 */
router.get('/database', async (req, res) => {
  try {
    // Check if database connection is ready
    const dbState = require('mongoose').connection.readyState;
    
    const healthStatus = {
      status: dbState === 1 ? 'OK' : 'ERROR',
      database: {
        connected: dbState === 1,
        connecting: dbState === 2,
        disconnecting: dbState === 3,
        disconnected: dbState === 0
      },
      timestamp: new Date().toISOString()
    };

    res.status(dbState === 1 ? 200 : 503).json(healthStatus);
  } catch (error) {
    res.status(503).json({
      status: 'ERROR',
      message: 'Database health check failed',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * @route   GET /api/health/system
 * @desc    System metrics and resource usage
 * @access  Public
 */
router.get('/system', (req, res) => {
  const systemInfo = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    system: {
      platform: process.platform,
      arch: process.arch,
      nodeVersion: process.version,
      pid: process.pid,
      uptime: process.uptime(),
      memory: {
        rss: Math.round(process.memoryUsage().rss / 1024 / 1024) + ' MB',
        heapTotal: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB',
        heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
        external: Math.round(process.memoryUsage().external / 1024 / 1024) + ' MB'
      },
      cpuUsage: process.cpuUsage()
    }
  };

  res.status(200).json(systemInfo);
});

module.exports = router;