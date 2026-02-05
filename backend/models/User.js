/**
 * User Model
 * Mongoose schema and model for User collection
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * User Schema Definition
 * Defines the structure and validation rules for User documents
 */
const userSchema = new mongoose.Schema({
  // User's full name
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },

  // User's email address
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },

  // User's password (hashed)
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false // Don't include password in query results by default
  },

  // User's role/permissions
  role: {
    type: String,
    enum: {
      values: ['user', 'admin'],
      message: 'Role must be either user or admin'
    },
    default: 'user'
  },

  // Account activation status
  isActive: {
    type: Boolean,
    default: true
  },

  // Profile picture URL
  avatar: {
    type: String,
    default: ''
  },

  // Password reset fields
  passwordResetToken: {
    type: String,
    select: false
  },
  
  passwordResetExpires: {
    type: Date,
    select: false
  },

  // Email verification
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  
  emailVerificationToken: {
    type: String,
    select: false
  },

  // Login security
  loginAttempts: {
    type: Number,
    default: 0
  },
  
  lockUntil: {
    type: Date
  },
  
  lastLogin: {
    type: Date
  },
  
  // Account security
  passwordChangedAt: {
    type: Date
  },

  // Refresh token management
  refreshToken: {
    type: String,
    select: false
  },
  
  refreshTokenExpires: {
    type: Date,
    select: false
  },
  
  // Blacklisted tokens for logout/security
  blacklistedTokens: [{
    token: String,
    expiresAt: Date
  }],

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  // Enable automatic timestamps
  timestamps: true
});

// Virtual for checking if account is locked
userSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

/**
 * Pre-save middleware to hash password
 * Runs before saving user document
 */
userSchema.pre('save', async function(next) {
  // Only hash password if it's modified
  if (!this.isModified('password')) return next();

  try {
    // Hash password with salt rounds
    const saltRounds = 12;
    this.password = await bcrypt.hash(this.password, saltRounds);
    
    // Set password changed timestamp (except for new users)
    if (!this.isNew) {
      this.passwordChangedAt = Date.now() - 1000; // Subtract 1 second to ensure token is issued before this timestamp
    }
    
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Pre-save middleware to update timestamps
 * Updates the updatedAt field before saving
 */
userSchema.pre('save', function(next) {
  if (!this.isNew) {
    this.updatedAt = Date.now();
  }
  next();
});

/**
 * Instance method to compare passwords
 * Compares plain text password with hashed password
 */
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

/**
 * Instance method to get public profile
 * Returns user data without sensitive information
 */
userSchema.methods.getPublicProfile = function() {
  const userObject = this.toObject();
  
  // Remove sensitive fields
  delete userObject.password;
  delete userObject.passwordResetToken;
  delete userObject.passwordResetExpires;
  delete userObject.emailVerificationToken;
  delete userObject.__v;
  
  return userObject;
};

/**
 * Instance method to generate password reset token
 * Creates a crypto-secure token for password reset
 */
userSchema.methods.createPasswordResetToken = function() {
  const resetToken = require('crypto').randomBytes(32).toString('hex');
  
  this.passwordResetToken = require('crypto').createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  
  return resetToken;
};

/**
 * Instance method to generate email verification token
 * Creates a token for email verification
 */
userSchema.methods.createEmailVerificationToken = function() {
  const verificationToken = require('crypto').randomBytes(32).toString('hex');
  
  this.emailVerificationToken = require('crypto').createHash('sha256').update(verificationToken).digest('hex');
  
  return verificationToken;
};

/**
 * Instance method to increment login attempts
 * Implements account lockout mechanism
 */
userSchema.methods.incrementLoginAttempts = function() {
  // Reset attempts and lockout if lockout period has expired
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $set: { loginAttempts: 1 },
      $unset: { lockUntil: 1 }
    });
  }
  
  // Increment login attempts
  let updates = { $inc: { loginAttempts: 1 } };
  
  // Lock account if max attempts reached
  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 }; // Lock for 2 hours
  }
  
  return this.updateOne(updates);
};

/**
 * Instance method to reset login attempts
 * Called after successful login
 */
userSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $set: { loginAttempts: 0 },
    $unset: { lockUntil: 1 }
  });
};

/**
 * Instance method to check if password was changed after token issuance
 */
userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

/**
 * Instance method to generate refresh token
 * Creates a secure refresh token for long-term authentication
 */
userSchema.methods.createRefreshToken = function() {
  const refreshToken = require('crypto').randomBytes(64).toString('hex');
  
  this.refreshToken = refreshToken;
  // Refresh token expires in 30 days
  this.refreshTokenExpires = Date.now() + 30 * 24 * 60 * 60 * 1000;
  
  return refreshToken;
};

/**
 * Instance method to validate refresh token
 * Checks if refresh token is valid and not expired
 */
userSchema.methods.validateRefreshToken = function(token) {
  return this.refreshToken === token && this.refreshTokenExpires > Date.now();
};

/**
 * Instance method to blacklist a token
 * Adds token to blacklist for security purposes
 */
userSchema.methods.blacklistToken = function(token, expiresAt) {
  this.blacklistedTokens.push({
    token,
    expiresAt: expiresAt || Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days default
  });
  
  // Clean up expired blacklisted tokens
  this.blacklistedTokens = this.blacklistedTokens.filter(item => item.expiresAt > Date.now());
};

/**
 * Instance method to check if token is blacklisted
 */
userSchema.methods.isTokenBlacklisted = function(token) {
  return this.blacklistedTokens.some(item => item.token === token && item.expiresAt > Date.now());
};

/**
 * Instance method to clear refresh token
 */
userSchema.methods.clearRefreshToken = function() {
  this.refreshToken = undefined;
  this.refreshTokenExpires = undefined;
};

/**
 * Static method to find active users
 */
userSchema.statics.findActiveUsers = function() {
  return this.find({ isActive: true });
};

/**
 * Static method to find user by email with security fields
 */
userSchema.statics.findByEmailWithSecurity = function(email) {
  return this.findOne({ email }).select('+password +passwordResetToken +passwordResetExpires +emailVerificationToken +refreshToken +refreshTokenExpires +blacklistedTokens');
};

/**
 * Static method to find user by refresh token
 */
userSchema.statics.findByRefreshToken = function(refreshToken) {
  return this.findOne({ 
    refreshToken: refreshToken,
    refreshTokenExpires: { $gt: Date.now() }
  }).select('+refreshToken +refreshTokenExpires +blacklistedTokens');
};

/**
 * Static method to cleanup expired tokens
 * Removes expired refresh tokens and blacklisted tokens
 */
userSchema.statics.cleanupExpiredTokens = async function() {
  const now = Date.now();
  
  // Clear expired refresh tokens
  await this.updateMany(
    { refreshTokenExpires: { $lt: now } },
    { 
      $unset: { refreshToken: '', refreshTokenExpires: '' },
      $pull: { blacklistedTokens: { expiresAt: { $lt: now } } }
    }
  );
  
  // Clean up expired blacklisted tokens
  await this.updateMany(
    { 'blacklistedTokens.expiresAt': { $lt: now } },
    { $pull: { blacklistedTokens: { expiresAt: { $lt: now } } } }
  );
};

/**
 * Create and export User model
 */
const User = mongoose.model('User', userSchema);

// Schedule periodic cleanup of expired tokens
setInterval(async () => {
  try {
    await User.cleanupExpiredTokens();
    console.log('Expired tokens cleaned up successfully');
  } catch (error) {
    console.error('Error cleaning up expired tokens:', error);
  }
}, 24 * 60 * 60 * 1000); // Run daily

module.exports = User;