# Fitness Tracker Application

A comprehensive full-stack fitness tracking application built with **React.js** (frontend) and **Java Spring Boot** (backend).

## Features

### User Features
- **User Registration & Authentication**: Secure JWT-based authentication
- **Workout Logging**: Track exercises with details (type, duration, calories, sets, reps, distance)
- **Progress Tracking**: Visual charts showing workout history and calories burned
- **Goal Management**: Set and track fitness goals with progress indicators
- **Challenges**: Join fitness challenges and compete on leaderboards
- **User Dashboard**: Comprehensive overview of fitness activity

### Admin Features
- **User Management**: Activate/deactivate user accounts
- **Content Moderation**: Approve or reject user-submitted workouts
- **Challenge Creation**: Create and manage fitness challenges
- **System Monitoring**: Track user activity and engagement

## Technology Stack

### Backend
- **Framework**: Spring Boot 3.2.0
- **Language**: Java 17
- **Security**: Spring Security with JWT
- **Database**: H2 (development) / PostgreSQL (production)
- **ORM**: Spring Data JPA
- **Build Tool**: Maven

### Frontend
- **Framework**: React.js with Vite
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Charts**: Chart.js with react-chartjs-2
- **Styling**: Custom CSS

## Getting Started

### Prerequisites
- Java 17 or higher
- Node.js 16 or higher
- Maven 3.6 or higher

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Build the project:
```bash
mvn clean install
```

3. Run the application:
```bash
mvn spring-boot:run
```

The backend server will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## Default Credentials

To create an admin account, manually register a user and then update the database to set their role to 'ADMIN'.

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration

### User
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update user profile

### Workouts
- `GET /api/workouts` - Get user workouts
- `POST /api/workouts` - Create workout
- `PUT /api/workouts/{id}` - Update workout
- `DELETE /api/workouts/{id}` - Delete workout

### Goals
- `GET /api/goals` - Get user goals
- `POST /api/goals` - Create goal
- `PUT /api/goals/{id}` - Update goal
- `DELETE /api/goals/{id}` - Delete goal

### Challenges
- `GET /api/challenges` - Get all challenges
- `POST /api/challenges/{id}/join` - Join challenge
- `GET /api/challenges/{id}/leaderboard` - View leaderboard

### Admin
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/{id}/activate` - Activate user
- `PUT /api/admin/users/{id}/deactivate` - Deactivate user
- `GET /api/admin/workouts/pending` - Get pending workouts
- `POST /api/admin/challenges` - Create challenge

## Project Structure

```
fitness-tracker/
├── backend/
│   ├── src/main/java/com/fitness/tracker/
│   │   ├── model/          # Entity classes
│   │   ├── repository/     # Data access layer
│   │   ├── service/        # Business logic
│   │   ├── controller/     # REST endpoints
│   │   ├── security/       # JWT & security config
│   │   └── dto/            # Data transfer objects
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── context/        # React context
│   │   └── styles/         # CSS files
│   └── package.json
└── README.md
```

## Features Demonstration

### User Workflow
1. Sign up with personal details
2. Log workouts with comprehensive details
3. View progress charts and statistics
4. Create and track fitness goals
5. Join challenges and view leaderboards

### Admin Workflow
1. Monitor all users and their activity
2. Approve/reject workout submissions
3. Create new fitness challenges
4. Manage user accounts

## Database Schema

- **Users**: User accounts with profile information
- **Workouts**: Exercise logs with detailed metrics
- **Goals**: User fitness goals with progress tracking
- **Challenges**: System challenges for users to join
- **Challenge Progress**: User progress in challenges

## Security

- JWT-based authentication
- Password encryption with BCrypt
- Role-based access control (USER, ADMIN)
- CORS configuration for frontend-backend communication

## Future Enhancements

- Social features (follow users, share workouts)
- Nutrition tracking
- Mobile app version
- Integration with fitness devices
- AI-powered workout recommendations
- Video exercise tutorials

## License

This project is open source and available for educational purposes.
