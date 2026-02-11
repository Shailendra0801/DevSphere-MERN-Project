/**
 * MongoDB Connection Test Script
 * Tests the connection to your MongoDB Atlas database
 */

const mongoose = require('mongoose');
require('dotenv').config({ path: './backend/.env' });

async function testMongoDBConnection() {
  console.log('🚀 Testing MongoDB Connection...\n');
  
  try {
    // Get MongoDB URI from environment variables
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      console.error('❌ MONGODB_URI not found in environment variables');
      console.log('Please check your backend/.env file');
      return;
    }
    
    console.log('🔗 Connection String:', mongoURI.replace(/\/\/.*@/, '//****:****@'));
    
    // Connect to MongoDB
    console.log('\n🔄 Connecting to MongoDB...');
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Successfully connected to MongoDB!');
    
    // Test basic operations
    console.log('\n🧪 Testing database operations...');
    
    // Create a simple test schema
    const TestSchema = new mongoose.Schema({
      name: String,
      createdAt: { type: Date, default: Date.now }
    });
    
    const TestModel = mongoose.model('Test', TestSchema);
    
    // Insert test document
    const testDoc = new TestModel({ name: 'Connection Test' });
    await testDoc.save();
    console.log('✅ Successfully inserted test document');
    
    // Find test document
    const foundDoc = await TestModel.findOne({ name: 'Connection Test' });
    console.log('✅ Successfully retrieved test document:', foundDoc.name);
    
    // Clean up
    await TestModel.deleteOne({ name: 'Connection Test' });
    console.log('✅ Cleaned up test data');
    
    // Close connection
    await mongoose.connection.close();
    console.log('✅ Connection closed successfully');
    
    console.log('\n🎉 MongoDB connection test completed successfully!');
    console.log('Your database is ready for the authentication system!');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error('Error:', error.message);
    
    if (error.message.includes('Authentication failed')) {
      console.log('\n🔧 Possible solutions:');
      console.log('1. Check your MongoDB connection string in backend/.env');
      console.log('2. Verify your MongoDB Atlas username and password');
    } else if (error.message.includes('getaddrinfo ENOTFOUND')) {
      console.log('\n🔧 Possible solutions:');
      console.log('1. Whitelist your IP address in MongoDB Atlas');
      console.log('2. Check your internet connection');
    } else if (error.message.includes('ECONNREFUSED')) {
      console.log('\n🔧 Possible solutions:');
      console.log('1. Make sure your MongoDB Atlas cluster is running');
      console.log('2. Check your connection string format');
    }
    
    process.exit(1);
  }
}

// Run the test
testMongoDBConnection();