# DevSphere Frontend Project Structure

## Project Overview
This is a robust Vite React TypeScript application with Tailwind CSS, React Router, and Axios integration.

## Folder Structure
```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable components
│   │   ├── Layout/         # Layout components (Navbar, Footer)
│   │   └── Routing/        # Routing components (ProtectedRoute)
│   ├── config/            # Configuration files
│   ├── lib/               # Utility libraries (Axios instance)
│   ├── pages/             # Page components
│   │   ├── Auth/          # Authentication pages
│   │   ├── Dashboard/     # Dashboard page
│   │   ├── Profile/       # Profile page
│   │   ├── Settings/      # Settings page
│   │   ├── NotFound/      # 404 page
│   │   └── Unauthorized/  # 403 page
│   ├── router/            # Router configuration
│   ├── App.tsx            # Main App component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles (Tailwind)
├── .env                   # Environment variables
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
└── vite.config.ts         # Vite configuration
```

## Key Features Implemented

### 1. Vite + TypeScript Setup
- Modern build tool with fast HMR
- TypeScript for type safety
- Optimized for production

### 2. Tailwind CSS Configuration
- Dark mode support with `class` strategy
- Custom color palette and themes
- Responsive design utilities
- Component classes for buttons, cards, inputs

### 3. React Router with Protected Routes
- ProtectedRoute component for authenticated routes
- GuestRoute component for unauthenticated-only routes
- Role-based route protection
- Automatic redirects with return URLs

### 4. Axios Instance with Interceptors
- Centralized API configuration
- Request/response interceptors
- Automatic token refresh handling
- Error handling and logging
- Retry mechanisms

### 5. Environment Configuration
- Type-safe environment variables
- Default fallback values
- Feature flags support
- API configuration

### 6. Layout Components
- Responsive Navbar with mobile menu
- Professional Footer with social links
- Dark mode toggle ready
- User dropdown menu

### 7. Authentication Ready
- Login and Register pages
- Protected dashboard routes
- User session management
- Token storage helpers

## Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## Environment Variables

Create a `.env` file with the following variables:

```env
VITE_APP_NAME=DevSphere
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_TOKEN_KEY=auth_token
VITE_REFRESH_TOKEN_KEY=refresh_token
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_LOGGING=true
```

## Development Guidelines

### Component Structure
- Use TypeScript interfaces for props
- Follow functional component patterns
- Implement proper error boundaries
- Use Tailwind utility classes consistently

### Styling
- Primary color: Blue (#3b82f6)
- Secondary color: Gray scales
- Dark mode support built-in
- Responsive design first

### API Integration
- Use the configured axios instance
- Handle loading states appropriately
- Implement proper error handling
- Follow REST API conventions

## Future Enhancements

- State management (Redux/Zustand)
- Internationalization (i18next)
- Testing setup (Jest/Vitest)
- Storybook for component documentation
- Progressive Web App features
- Analytics integration

## Getting Started

1. Install dependencies: `npm install`
2. Create `.env` file with your configuration
3. Start development server: `npm run dev`
4. Visit `http://localhost:5173`

The application will automatically connect to your backend API at `http://localhost:5000`.