# Application Flow & User Guide

## Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (React)                        │
│                   http://localhost:5173                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌────────────┐              │
│  │  Login   │  │  Signup  │  │ Protected  │              │
│  │  Page    │  │  Page    │  │   Routes   │              │
│  └──────────┘  └──────────┘  └────────────┘              │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │         User Dashboard (3 Tabs)                     │  │
│  │  - Overview: Stats, Charts, Recent Workouts         │  │
│  │  - Workouts: Log & View All Workouts                │  │
│  │  - Goals: Create & Track Goals                      │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │         Admin Dashboard (3 Tabs)                    │  │
│  │  - Users: Manage All Users                          │  │
│  │  - Workouts: Approve/Reject Pending                 │  │
│  │  - Challenges: Create New Challenges                │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │         Challenges Page                             │  │
│  │  - View Active Challenges                           │  │
│  │  - Join Challenges                                  │  │
│  │  - View Leaderboards                                │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                           ↕ HTTP/REST API
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND (Spring Boot)                    │
│                   http://localhost:8080                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Security Layer (JWT)                         │  │
│  │  - Authentication Filter                             │  │
│  │  - Authorization (USER/ADMIN roles)                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Controllers (REST Endpoints)                 │  │
│  │  - AuthController                                    │  │
│  │  - UserController                                    │  │
│  │  - WorkoutController                                 │  │
│  │  - GoalController                                    │  │
│  │  - ChallengeController                               │  │
│  │  - AdminController                                   │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Service Layer (Business Logic)               │  │
│  │  - UserService                                       │  │
│  │  - WorkoutService                                    │  │
│  │  - GoalService                                       │  │
│  │  - ChallengeService                                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Repository Layer (Data Access)               │  │
│  │  - UserRepository                                    │  │
│  │  - WorkoutRepository                                 │  │
│  │  - GoalRepository                                    │  │
│  │  - ChallengeRepository                               │  │
│  │  - ChallengeProgressRepository                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                           ↕ JPA
┌─────────────────────────────────────────────────────────────┐
│                   DATABASE (H2 In-Memory)                   │
│                                                             │
│  Tables:                                                    │
│  - users                                                    │
│  - workouts                                                 │
│  - goals                                                    │
│  - challenges                                               │
│  - challenge_progress                                       │
│  - challenge_participants (join table)                     │
└─────────────────────────────────────────────────────────────┘
```

## User Journey Flow

### 1. New User Registration
```
Start → Signup Page → Enter Details → Submit
  ↓
Backend validates → Encrypts password → Saves to DB
  ↓
Success → Redirect to Login
```

### 2. User Login
```
Login Page → Enter Credentials → Submit
  ↓
Backend validates → Generates JWT token → Returns user data
  ↓
Frontend stores token → Navigate to Dashboard
```

### 3. Workout Logging (User)
```
Dashboard → Workouts Tab → Click "Log Workout"
  ↓
Fill Form (exercise, type, duration, calories, etc.)
  ↓
Submit → Backend saves → Refresh workout list
  ↓
View in list & chart updates automatically
```

### 4. Goal Creation (User)
```
Dashboard → Goals Tab → Click "Create Goal"
  ↓
Fill Form (title, type, target value, dates)
  ↓
Submit → Backend saves → Refresh goal list
  ↓
View goal card with progress bar
```

### 5. Join Challenge (User)
```
Navigate to Challenges → View Active Challenges
  ↓
Select Challenge → Click "Join Challenge"
  ↓
Backend creates ChallengeProgress record
  ↓
View Leaderboard → See ranking
```

### 6. User Management (Admin)
```
Admin Dashboard → Users Tab
  ↓
View All Users → Select User
  ↓
Click Activate/Deactivate → Backend updates
  ↓
User status changes immediately
```

### 7. Challenge Creation (Admin)
```
Admin Dashboard → Challenges Tab
  ↓
Fill Challenge Form (name, description, type, target, dates)
  ↓
Submit → Backend saves → Challenge becomes active
  ↓
Users can now see and join the challenge
```

## Data Flow Example: Logging a Workout

```
1. USER ACTION
   User fills workout form and clicks "Log Workout"
   
2. FRONTEND
   WorkoutForm.jsx captures data
   ↓
   Calls workoutAPI.createWorkout(data)
   ↓
   api.js sends POST request with JWT token
   
3. BACKEND
   WorkoutController receives request
   ↓
   JwtAuthenticationFilter validates token
   ↓
   Extracts username from token
   ↓
   WorkoutService.createWorkout()
   ↓
   Finds User from database
   ↓
   Creates Workout entity with User reference
   ↓
   WorkoutRepository.save()
   ↓
   Returns saved Workout
   
4. DATABASE
   Inserts new row in workouts table
   with foreign key to users table
   
5. RESPONSE
   Backend returns workout data
   ↓
   Frontend receives success
   ↓
   Closes form
   ↓
   Refreshes workout list
   ↓
   Chart updates with new data
```

## Security Flow

```
1. PUBLIC ENDPOINTS (No Auth Required)
   - POST /api/auth/login
   - POST /api/auth/signup
   
2. PROTECTED ENDPOINTS (JWT Required)
   Request → Check Authorization header
   ↓
   Extract JWT token
   ↓
   Validate token (signature, expiration)
   ↓
   If valid: Extract username → Load user details
   ↓
   Set SecurityContext → Allow access
   
3. ADMIN ENDPOINTS (JWT + ADMIN role)
   All above checks +
   ↓
   Check user role
   ↓
   If role == ADMIN → Allow access
   If role != ADMIN → Return 403 Forbidden
```

## Component Hierarchy

```
App
├── AuthProvider (Context)
│   ├── Login
│   ├── Signup
│   ├── UserDashboard
│   │   ├── WorkoutForm
│   │   ├── WorkoutList
│   │   ├── GoalForm
│   │   ├── GoalList
│   │   └── ProgressChart
│   ├── AdminDashboard
│   └── Challenges
```

## State Management

```
Global State (AuthContext)
├── user (current logged-in user)
├── loading (auth loading state)
└── methods
    ├── login()
    ├── signup()
    ├── logout()
    └── isAdmin()

Local State (Components)
├── UserDashboard
│   ├── workouts[]
│   ├── goals[]
│   ├── showWorkoutForm
│   ├── showGoalForm
│   └── activeTab
├── AdminDashboard
│   ├── users[]
│   ├── pendingWorkouts[]
│   ├── newChallenge{}
│   └── activeTab
└── Challenges
    ├── challenges[]
    ├── selectedChallenge
    └── leaderboard[]
```

## Key Features Flow

### Progress Chart Visualization
```
1. Fetch workouts from backend
2. Filter last 7 days
3. Group by date
4. Calculate workouts count per day
5. Calculate calories per day
6. Render Chart.js line chart with dual axes
```

### Leaderboard Ranking
```
1. Fetch ChallengeProgress for challenge
2. Backend sorts by currentProgress DESC
3. Frontend displays with ranks
4. Top 3 get special styling (gold, silver, bronze)
5. Shows progress bar and percentage
```

### Real-time Statistics
```
1. Fetch workouts and goals
2. Calculate:
   - Total workouts (count)
   - Total calories (sum)
   - Active goals (filter by IN_PROGRESS)
   - Completed goals (filter by COMPLETED)
3. Display in stat cards
```

## Error Handling

```
Frontend → Backend API Call
  ↓
  Try/Catch block
  ↓
  On Error:
    - Log to console
    - Show user-friendly message
    - Keep UI stable
  ↓
  On Success:
    - Update state
    - Refresh data
    - Show success feedback
```

---

This flow diagram helps understand how all components work together to create a seamless fitness tracking experience!
