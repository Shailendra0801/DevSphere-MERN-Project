# DevSphere MERN Project - Setup Instructions

## Next Steps:

### 1. Set up Git Repository
Initialize your repository and connect it to your preferred Git hosting service:

```bash
git init
git add .
git commit -m "Initial commit"
# Then connect to your Git hosting service (GitHub, GitLab, etc.)
```

### 2. Set up MongoDB
You have two options:

#### Option A: Local MongoDB Installation
1. Download and install MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. The default connection string in .env will work: `mongodb://localhost:27017/devsphere`

#### Option B: MongoDB Atlas (Cloud - Recommended)
1. Go to https://cloud.mongodb.com/
2. Sign up for a free account
3. Create a new cluster (free tier)
4. Create a database user
5. Add your IP address to the whitelist (or allow access from anywhere for development)
6. Get your connection string
7. Update the MONGODB_URI in backend/.env with your Atlas connection string

### 3. Test the Application

#### Start the backend server:
```bash
cd backend
npm run dev
```
You should see: "Server is running on port 5000" and "MongoDB connected successfully"

#### Start the frontend:
In a new terminal:
```bash
cd frontend
npm start
```
This will open your browser at http://localhost:3000

#### Test the connection:
1. Click the "Check Backend Connection" button on the homepage
2. You should see a success message confirming the connection

### 4. Development Commands

#### Backend:
- `npm run dev` - Start development server with nodemon (auto-reload)
- `npm start` - Start production server

#### Frontend:
- `npm start` - Start development server
- `npm run build` - Create production build
- `npm test` - Run tests

### 5. Project Structure
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
└── README.md         # Documentation
```

### Troubleshooting

**MongoDB Connection Error:**
- Make sure MongoDB is running locally or your Atlas connection string is correct
- Check that the port 27017 is not blocked by firewall

**Port Already in Use:**
- Backend default port: 5000
- Frontend default port: 3000
- Change ports in .env file or close other applications using these ports

**CORS Issues:**
- The CORS middleware is already configured in backend/server.js
- Make sure both servers are running

**Git Issues:**
- Make sure you've created the GitHub repository first
- Check your internet connection
- Verify your GitHub credentials