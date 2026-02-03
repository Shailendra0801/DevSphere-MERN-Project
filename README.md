# DevSphere MERN Project

A full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Project Structure

```
DevSphere-MERN-Project/
├── backend/           # Node.js/Express server
│   ├── server.js     # Main server file
│   ├── .env          # Environment variables
│   └── package.json  # Backend dependencies
├── frontend/         # React application
│   ├── src/          # React source files
│   ├── public/       # Static assets
│   └── package.json  # Frontend dependencies
├── .gitignore        # Git ignore file
└── README.md         # This file
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- MongoDB (local installation or MongoDB Atlas account)

### Installation

1. Clone the repository
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```
   The server will run on http://localhost:5000

2. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```
   The React app will run on http://localhost:3000

### Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
```

## Features

- ✅ Backend API with Express.js
- ✅ MongoDB database integration
- ✅ React frontend with modern hooks
- ✅ API connectivity between frontend and backend
- ✅ CORS enabled for cross-origin requests
- ✅ Environment variable configuration

## Development

This project follows standard MERN stack development practices:

- Backend runs on port 5000
- Frontend runs on port 3000
- MongoDB connection configured via environment variables
- Hot reloading enabled for both frontend and backend

## Contributing

1. Create your feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)

## License

This project is licensed under the MIT License.