/**
 * Database Configuration Module
 * Handles MongoDB Atlas connection setup and management
 */

const mongoose = require('mongoose');

/**
 * Connect to MongoDB Atlas database
 * @returns {Promise<void>} Promise that resolves when connection is established
 */
const connectDB = async () => {
  try {
    // Get MongoDB URI from environment variables
    const mongoURI = process.env.MONGODB_URI;
    
    // Validate that MongoDB URI is provided
    if (!mongoURI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    // Connection options for MongoDB (modern options)
    const connectionOptions = {
      // useNewUrlParser and useUnifiedTopology are deprecated in newer versions
      // They are now default behaviors and don't need to be specified
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    };

    // Attempt to connect to MongoDB
    const conn = await mongoose.connect(mongoURI, connectionOptions);

    // Log successful connection
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);

    // Handle connection events
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected from MongoDB');
    });

    // Graceful shutdown handling
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    // Log connection error but don't exit in development
    console.error('MongoDB connection failed:', error.message);
    console.warn('⚠️  Server will start without database connection');
    console.warn('🔧 Fix your MongoDB connection string in .env file');
    // Don't exit in development mode
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

module.exports = connectDB;