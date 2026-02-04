# DevSphere Authentication System

A complete authentication system for the DevSphere MERN project with robust security features, theme support, and comprehensive API endpoints.

## Features

### 🔐 Authentication & Security
- **User Registration** with email verification
- **Secure Login** with JWT tokens
- **Password Reset** functionality
- **Account Lockout** after failed attempts
- **Password Strength** validation
- **SQL Injection Protection** through parameterized queries
- **Rate Limiting** to prevent brute force attacks
- **JWT Token Management** with expiration
- **Password Hashing** using bcrypt (12 rounds)

### 🎨 Theme Support
- **Dark/Light Theme** toggle
- **Persistent Theme** using localStorage
- **System Preference Detection**
- **Theme-aware Components**

### 🛡️ Security Features
- Input validation and sanitization
- Password strength requirements
- Account lockout after 5 failed attempts
- Secure password reset with time-limited tokens
- Email verification for new accounts
- CORS protection
- Helmet security headers
- Rate limiting for API endpoints

## API Endpoints

### Authentication Routes (`/api/v1/auth`)

#### `POST /register`
Register a new user
```json
{
  "name": "John Doe",
  "email": "john@example.com", 
  "password": "SecurePass123!",
  "confirmPassword": "SecurePass123!"
}
```

#### `POST /login`
Login user
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

#### `POST /logout`
Logout current user (requires authentication)

#### `GET /me`
Get current user profile (requires authentication)

#### `PATCH /update-password`
Update user password (requires authentication)
```json
{
  "currentPassword": "OldPass123!",
  "newPassword": "NewPass456!",
  "confirmNewPassword": "NewPass456!"
}
```

#### `POST /forgot-password`
Request password reset
```json
{
  "email": "john@example.com"
}
```

#### `PATCH /reset-password/:token`
Reset password with token
```json
{
  "password": "NewSecurePass789!",
  "confirmPassword": "NewSecurePass789!"
}
```

#### `GET /verify-email/:token`
Verify email address

#### `POST /resend-verification`
Resend email verification
```json
{
  "email": "john@example.com"
}
```

## Setup Instructions

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables** (`.env` file):
   ```
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=your_mongodb_connection_string
   FRONTEND_URL=http://localhost:3000
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRES_IN=7d
   EMAIL_HOST=smtp.ethereal.email
   EMAIL_PORT=587
   EMAIL_USER=your_email@ethereal.email
   EMAIL_PASS=your_email_password
   ```

4. **Start the server:**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

## Password Requirements

Passwords must meet the following criteria:
- Minimum 8 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one number (0-9)
- At least one special character (@$!%*?&)

## Email Configuration

For development, you can use [Ethereal Email](https://ethereal.email/) for testing email functionality:

1. Visit https://ethereal.email/create
2. Create a free test account
3. Update the `.env` file with the provided credentials

For production, configure with your SMTP provider (Gmail, SendGrid, etc.).

## Testing with Postman

Import the `DevSphere-Auth-API.postman_collection.json` file into Postman to test all API endpoints.

### Environment Variables in Postman:
- `base_url`: http://localhost:5000
- `auth_token`: (will be set automatically after login)

## Security Implementation Details

### Password Security
- Bcrypt hashing with 12 salt rounds
- Password strength validation
- Password confirmation matching
- Password change detection

### Token Security
- JWT tokens with expiration
- Token invalidation on password change
- Secure token storage (HTTP-only cookies recommended for production)

### Account Protection
- Account lockout after 5 failed login attempts
- 2-hour lockout period
- Email verification for new accounts
- Time-limited password reset tokens (10 minutes)

### Input Validation
- Express-validator for request validation
- Sanitization of user inputs
- Prevention of SQL injection through Mongoose ODM

## Theme System

The theme system automatically:
- Detects system preference on first visit
- Saves user preference to localStorage
- Applies theme classes to all components
- Provides smooth transitions between themes

## Folder Structure

```
backend/
├── config/
│   └── db.js
├── controllers/
│   └── auth.controller.js
├── middleware/
│   ├── auth.middleware.js
│   ├── auth.validation.js
│   ├── errorHandler.js
│   └── logger.js
├── models/
│   └── User.js
├── routes/
│   ├── api.js
│   ├── auth.routes.js
│   └── health.js
├── utils/
│   └── email.js
├── .env
├── app.js
└── server.js

frontend/
├── src/
│   ├── components/
│   │   ├── Auth.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   └── ForgotPassword.js
│   ├── contexts/
│   │   ├── AuthContext.js
│   │   └── ThemeContext.js
│   ├── styles/
│   │   └── AuthStyles.css
│   ├── App.js
│   └── index.js
```

## Error Handling

The system includes comprehensive error handling:
- Validation errors with detailed field information
- Authentication errors with appropriate HTTP status codes
- Database errors with fallback responses
- Rate limiting errors
- Email sending failures

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License.