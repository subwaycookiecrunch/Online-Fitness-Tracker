# Fitness Tracker - Project Summary

## Overview
A complete full-stack online fitness tracking application with user and admin dashboards.

## Technology Stack

### Backend (Java Spring Boot)
- **Framework**: Spring Boot 3.2.0
- **Security**: JWT Authentication with Spring Security
- **Database**: H2 (in-memory for development)
- **ORM**: Spring Data JPA
- **Build**: Maven

### Frontend (React.js)
- **Framework**: React 18 with Vite
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Charts**: Chart.js with react-chartjs-2
- **HTTP Client**: Axios
- **Styling**: Custom CSS

## Features Implemented

### Authentication & Authorization
✅ User registration with profile details
✅ JWT-based login system
✅ Role-based access control (USER, ADMIN)
✅ Protected routes and API endpoints
✅ Secure password encryption

### User Dashboard
✅ **Overview Tab**
  - Statistics cards (total workouts, calories, active goals, completed goals)
  - Progress charts showing 7-day workout history
  - Recent workouts list
  
✅ **Workouts Tab**
  - Log new workouts with detailed metrics (type, duration, sets, reps, distance, calories)
  - View all logged workouts
  - Delete workouts
  - Workout categorization (Cardio, Strength, Flexibility, Sports, Other)
  
✅ **Goals Tab**
  - Create fitness goals with target values
  - Track progress with visual progress bars
  - Multiple goal types (Weight Loss, Muscle Gain, Cardio Improvement, etc.)
  - Delete goals

### Challenges & Leaderboards
✅ View active challenges
✅ Join challenges
✅ Real-time leaderboards with rankings
✅ Progress tracking for each challenge
✅ Multiple challenge types (Distance, Calories, Workouts, Duration)

### Admin Dashboard
✅ **User Management**
  - View all registered users
  - Activate/deactivate user accounts
  - User details and statistics
  
✅ **Content Moderation**
  - Review pending workout submissions
  - Approve/reject workouts
  
✅ **Challenge Management**
  - Create new fitness challenges
  - Set challenge parameters (type, target, dates)
  - Manage challenge lifecycle

## Database Schema

### Entities Created:
1. **User** - User accounts with profile information
2. **Workout** - Exercise logs with metrics
3. **Goal** - Fitness goals with progress tracking
4. **Challenge** - System challenges
5. **ChallengeProgress** - User progress in challenges

### Relationships:
- User → Workouts (One-to-Many)
- User → Goals (One-to-Many)
- User ↔ Challenges (Many-to-Many)
- Challenge → ChallengeProgress (One-to-Many)

## API Endpoints

### Authentication
- POST `/api/auth/login` - User login
- POST `/api/auth/signup` - User registration

### User Operations
- GET `/api/users/me` - Get current user
- PUT `/api/users/me` - Update profile

### Workouts
- GET `/api/workouts` - List user workouts
- POST `/api/workouts` - Create workout
- PUT `/api/workouts/{id}` - Update workout
- DELETE `/api/workouts/{id}` - Delete workout
- GET `/api/workouts/range` - Get workouts by date range

### Goals
- GET `/api/goals` - List user goals
- GET `/api/goals/active` - List active goals
- POST `/api/goals` - Create goal
- PUT `/api/goals/{id}` - Update goal
- PUT `/api/goals/{id}/progress` - Update progress
- DELETE `/api/goals/{id}` - Delete goal

### Challenges
- GET `/api/challenges` - List challenges
- GET `/api/challenges/{id}` - Get challenge details
- POST `/api/challenges/{id}/join` - Join challenge
- PUT `/api/challenges/{id}/progress` - Update progress
- GET `/api/challenges/{id}/leaderboard` - Get leaderboard

### Admin
- GET `/api/admin/users` - List all users
- PUT `/api/admin/users/{id}/activate` - Activate user
- PUT `/api/admin/users/{id}/deactivate` - Deactivate user
- GET `/api/admin/workouts/pending` - List pending workouts
- PUT `/api/admin/workouts/{id}/approve` - Approve workout
- PUT `/api/admin/workouts/{id}/reject` - Reject workout
- POST `/api/admin/challenges` - Create challenge
- PUT `/api/admin/challenges/{id}` - Update challenge
- DELETE `/api/admin/challenges/{id}` - Delete challenge

## Frontend Components

### Pages
- `Login.jsx` - User authentication
- `Signup.jsx` - User registration
- `UserDashboard.jsx` - Main user interface with tabs
- `AdminDashboard.jsx` - Admin control panel
- `Challenges.jsx` - Challenge listing and leaderboards

### Components
- `WorkoutForm.jsx` - Log workout form
- `WorkoutList.jsx` - Display workouts
- `GoalForm.jsx` - Create goal form
- `GoalList.jsx` - Display goals with progress
- `ProgressChart.jsx` - Chart.js visualization

### Services
- `api.js` - Axios HTTP client with interceptors
- `AuthContext.jsx` - Authentication state management

## UI/UX Features
✅ Responsive design for mobile and desktop
✅ Modern gradient backgrounds and card layouts
✅ Color-coded workout types and goal statuses
✅ Interactive charts with dual-axis (workouts & calories)
✅ Progress bars with percentage indicators
✅ Leaderboard with top 3 highlighted (gold, silver, bronze)
✅ Tab-based navigation
✅ Form validation
✅ Error and success messages
✅ Loading states

## Security Features
✅ JWT token-based authentication
✅ Password encryption with BCrypt
✅ Protected API endpoints
✅ Role-based authorization
✅ CORS configuration
✅ Request interceptors for token injection

## Sample Data
✅ Pre-configured admin account (admin/admin123)
✅ Pre-configured demo user (demo/demo123)
✅ 3 Sample challenges automatically created

## Project Structure
```
fitness-tracker/
├── backend/
│   ├── src/main/java/com/fitness/tracker/
│   │   ├── config/         - DataInitializer
│   │   ├── controller/     - REST endpoints (6 controllers)
│   │   ├── dto/            - Data transfer objects (4 DTOs)
│   │   ├── model/          - JPA entities (5 entities)
│   │   ├── repository/     - Data access (5 repositories)
│   │   ├── security/       - JWT & security config (3 classes)
│   │   └── service/        - Business logic (5 services)
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── components/     - Reusable components (5 components)
│   │   ├── context/        - AuthContext
│   │   ├── pages/          - Page components (5 pages)
│   │   ├── services/       - API service
│   │   ├── styles/         - CSS files (2 files)
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── README.md
└── QUICKSTART.md
```

## Files Created

### Backend (Java)
- 1 Main Application class
- 5 Entity models
- 5 Repository interfaces
- 5 Service classes
- 6 Controller classes
- 4 DTO classes
- 3 Security classes
- 1 Data initializer
- 1 Configuration file (application.properties)
- 1 Build file (pom.xml)

**Total: 32 backend files**

### Frontend (React)
- 5 Page components
- 5 Reusable components
- 1 Context provider
- 1 API service
- 3 CSS files
- 1 App component
- 1 Main entry point
- 1 Package configuration

**Total: 18 frontend files**

### Documentation
- README.md
- QUICKSTART.md

**Total: 50+ files created**

## How to Run

1. **Backend**: `cd backend && mvn spring-boot:run`
2. **Frontend**: `cd frontend && npm run dev`
3. **Access**: http://localhost:5173

## Testing Credentials

**Admin**: admin / admin123
**User**: demo / demo123

## Skills Demonstrated

1. ✅ Full-stack development (Java + React)
2. ✅ RESTful API design
3. ✅ JWT Authentication & Authorization
4. ✅ Database design and relationships
5. ✅ Spring Security configuration
6. ✅ React state management (Context API)
7. ✅ Responsive UI/UX design
8. ✅ Data visualization (charts)
9. ✅ CRUD operations
10. ✅ Role-based access control
11. ✅ Form handling and validation
12. ✅ API integration
13. ✅ Modern CSS styling
14. ✅ Component-based architecture
15. ✅ Git-ready project structure

## Ready for Deployment
- Backend can be deployed to any cloud platform supporting Java
- Frontend can be deployed to Netlify, Vercel, or any static hosting
- Database can be migrated to PostgreSQL for production
- Environment variables ready for configuration

---

**Project Status**: ✅ COMPLETE AND READY TO USE

All features are fully functional and the application is ready for demonstration or deployment!
