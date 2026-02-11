# DevSphere Deployment Guide

## Prerequisites

- Docker and Docker Compose installed
- MongoDB Atlas account (for production) or local MongoDB
- Node.js 18+ (for local development)

## Local Development with Docker

1. **Clone the repository:**
```bash
git clone <repository-url>
cd DevSphere-MERN-Project
```

2. **Create environment files:**
```bash
cp .env.example .env
cp backend/.env.production backend/.env
```

3. **Update environment variables:**
Edit the `.env` file with your MongoDB connection string and other configurations.

4. **Build and run with Docker Compose:**
```bash
docker-compose up --build
```

5. **Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- MongoDB Express: http://localhost:8081

## Production Deployment

### Option 1: Render.com (Recommended for beginners)

1. **Prepare your code:**
```bash
# Make sure your repository is on GitHub
git add .
git commit -m "Prepare for production deployment"
git push origin main
```

2. **Deploy Backend to Render:**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New+" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - Name: `devsphere-backend`
     - Region: Choose closest to your users
     - Branch: `main`
     - Root Directory: `backend`
     - Runtime: `Node`
     - Build Command: `npm install`
     - Start Command: `npm start`
   - Add Environment Variables:
     ```
     NODE_ENV=production
     PORT=10000
     MONGODB_URI=your_production_mongodb_uri
     JWT_SECRET=your_production_secret
     FRONTEND_URL=https://your-frontend-url.com
     ```

3. **Deploy Frontend to Render:**
   - Click "New+" → "Static Site"
   - Connect same repository
   - Configure:
     - Name: `devsphere-frontend`
     - Build Command: `npm install && npm run build`
     - Publish Directory: `dist`
   - Add Environment Variables:
     ```
     VITE_API_BASE_URL=https://your-backend-url.onrender.com
     ```

### Option 2: Manual Production Deployment

1. **Build the frontend:**
```bash
cd frontend
npm run build
```

2. **Deploy frontend build to your hosting provider:**
   - Netlify: Drag and drop the `dist` folder
   - Vercel: Connect your GitHub repo
   - AWS S3: Upload files to bucket

3. **Deploy backend to cloud provider:**
   - Heroku: `git push heroku main`
   - DigitalOcean App Platform
   - AWS EC2 with PM2

4. **Configure environment variables on your hosting platform**

## Environment Variables

### Backend (.env)
```env
# Required
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=https://yourdomain.com

# Optional
EMAIL_HOST=smtp.yourprovider.com
EMAIL_PORT=587
EMAIL_USER=your@email.com
EMAIL_PASS=your_password
LOG_LEVEL=warn
```

### Frontend (.env)
```env
VITE_API_BASE_URL=https://your-backend-api.com
VITE_APP_NAME=DevSphere
```

## Health Checks

The application includes health check endpoints:

- Backend: `GET /api/health`
- Frontend: `GET /health`

These are configured in the Docker setup and can be used for monitoring.

## Monitoring and Logs

### Docker Logs
```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs backend
docker-compose logs frontend

# Follow logs in real-time
docker-compose logs -f
```

### Production Monitoring
Consider setting up:
- Application performance monitoring (APM)
- Error tracking (Sentry, Rollbar)
- Uptime monitoring (UptimeRobot, Pingdom)

## Backup and Recovery

### MongoDB Backup
```bash
# Manual backup
mongodump --uri="mongodb://localhost:27017/devsphere" --out=./backups

# Restore
mongorestore --uri="mongodb://localhost:27017/devsphere" ./backups/devsphere
```

### Automated Backups
Set up cron jobs or use cloud provider backup services.

## Security Considerations

1. **Environment Variables:**
   - Never commit `.env` files to version control
   - Use strong, random secrets for JWT
   - Rotate secrets regularly

2. **HTTPS:**
   - Always use HTTPS in production
   - Configure SSL certificates

3. **CORS:**
   - Restrict origins in production
   - Don't use wildcards

4. **Rate Limiting:**
   - Already implemented in the backend
   - Adjust limits based on your needs

## Troubleshooting

### Common Issues

1. **Connection refused to MongoDB:**
   - Check MongoDB URI format
   - Verify network connectivity
   - Ensure MongoDB service is running

2. **CORS errors:**
   - Check FRONTEND_URL environment variable
   - Verify the URL matches exactly

3. **JWT token issues:**
   - Ensure JWT_SECRET is consistent
   - Check token expiration settings

4. **Docker build failures:**
   - Check Dockerfile syntax
   - Verify file permissions
   - Ensure all dependencies are listed

### Debugging Commands

```bash
# Check running containers
docker ps

# Check container logs
docker logs <container_name>

# Execute commands in container
docker exec -it <container_name> sh

# Stop and remove containers
docker-compose down

# Clean build (removes volumes)
docker-compose down -v --remove-orphans
```

## Scaling

For production scaling:

1. **Horizontal scaling:**
   - Use load balancers
   - Multiple backend instances
   - CDN for frontend assets

2. **Database scaling:**
   - MongoDB Atlas clusters
   - Read replicas
   - Sharding for large datasets

3. **Caching:**
   - Redis for session storage
   - CDN caching for static assets

## Maintenance

Regular maintenance tasks:

- Update dependencies
- Monitor logs and metrics
- Review security patches
- Test backup restoration
- Update SSL certificates

---

Need help? Check the [README.md](README.md) for development setup instructions.