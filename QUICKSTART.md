# Quick Start Guide

## Running the Fitness Tracker Application

### Step 1: Start the Backend Server

Open a terminal and run:

```bash
cd "c:\Users\raj97\OneDrive\Desktop\java fitness tracker\backend"
mvn spring-boot:run
```

**Wait for the message**: `Started FitnessTrackerApplication`

The backend will be available at: **http://localhost:8080**

### Step 2: Start the Frontend Server

Open a NEW terminal and run:

```bash
cd "c:\Users\raj97\OneDrive\Desktop\java fitness tracker\frontend"
npm run dev
```

The frontend will be available at: **http://localhost:5173**

### Step 3: Access the Application

Open your browser and navigate to: **http://localhost:5173**

## Default Credentials

The application comes with pre-configured accounts:

### Admin Account
- **Username**: `admin`
- **Password**: `admin123`
- **Access**: Admin Dashboard with full system control

### Demo User Account
- **Username**: `demo`
- **Password**: `demo123`
- **Access**: User Dashboard with fitness tracking features

### Or Create New Account
Click "Sign up" on the login page to create a new user account.

## Application Features

### For Users (demo account or new signup):
1. **Dashboard** - View your fitness statistics and progress
2. **Log Workouts** - Track your exercises with detailed metrics
3. **Set Goals** - Create and monitor your fitness goals
4. **Join Challenges** - Participate in fitness challenges
5. **View Leaderboards** - Compete with other users

### For Admins (admin account):
1. **User Management** - View and manage all user accounts
2. **Workout Approval** - Review and approve pending workouts
3. **Challenge Creation** - Create new fitness challenges
4. **System Monitoring** - Track overall application activity

## Pre-loaded Data

The application comes with:
- **Admin account** for system management
- **Demo user** account for testing
- **3 Sample challenges**:
  - 30-Day Cardio Challenge
  - Run 100 Miles
  - Burn 10,000 Calories

## Database Access (Development)

Access the H2 database console at: **http://localhost:8080/h2-console**

Connection details:
- **JDBC URL**: `jdbc:h2:mem:fitnessdb`
- **Username**: `sa`
- **Password**: (leave blank)

## Troubleshooting

### Backend Issues
- Ensure Java 17 is installed: `java -version`
- Check if port 8080 is available
- Review logs in the terminal for errors

### Frontend Issues
- Ensure Node.js is installed: `node -v`
- Check if port 5173 is available
- Clear browser cache if styles don't load
- Verify backend is running before starting frontend

### Connection Issues
- Ensure both backend and frontend are running
- Check CORS configuration in backend
- Verify API URL in frontend (src/services/api.js)

## Testing the Application

### As a User:
1. Login with `demo`/`demo123`
2. Log a workout (e.g., "Morning Run", Cardio, 30 minutes, 300 calories)
3. Create a goal (e.g., "Lose 5kg", Weight Loss, target: 5)
4. Join the "30-Day Cardio Challenge"
5. View your progress chart

### As an Admin:
1. Login with `admin`/`admin123`
2. View all users in User Management
3. Create a new challenge
4. Check pending workouts (if any)
5. Manage user accounts

## Next Steps

1. Explore all features in both user and admin dashboards
2. Create custom workouts and goals
3. Join multiple challenges
4. Invite friends to compete on leaderboards
5. Customize your profile in the user settings

## Support

For issues or questions, refer to the main README.md file in the project root.

Enjoy tracking your fitness journey! 🏃‍♂️💪
