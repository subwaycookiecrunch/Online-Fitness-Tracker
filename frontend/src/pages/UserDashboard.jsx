import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { workoutAPI, goalAPI } from '../services/api';
import WorkoutForm from '../components/WorkoutForm';
import GoalForm from '../components/GoalForm';
import WorkoutList from '../components/WorkoutList';
import GoalList from '../components/GoalList';
import ProgressChart from '../components/ProgressChart';
import '../styles/Dashboard.css';

function UserDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState([]);
  const [goals, setGoals] = useState([]);
  const [showWorkoutForm, setShowWorkoutForm] = useState(false);
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchWorkouts();
    fetchGoals();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const response = await workoutAPI.getWorkouts();
      setWorkouts(response.data);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  const fetchGoals = async () => {
    try {
      const response = await goalAPI.getGoals();
      setGoals(response.data);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const stats = {
    totalWorkouts: workouts.length,
    totalCalories: workouts.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0),
    activeGoals: goals.filter(g => g.status === 'IN_PROGRESS').length,
    completedGoals: goals.filter(g => g.status === 'COMPLETED').length,
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <h1>Fitness Tracker</h1>
        <div className="nav-links">
          <span className="user-name">Welcome, {user.username}</span>
          <button onClick={() => navigate('/challenges')} className="btn-nav">Challenges</button>
          <button onClick={handleLogout} className="btn-nav">Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="tabs">
          <button 
            className={activeTab === 'overview' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={activeTab === 'workouts' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('workouts')}
          >
            Workouts
          </button>
          <button 
            className={activeTab === 'goals' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('goals')}
          >
            Goals
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Workouts</h3>
                <p className="stat-value">{stats.totalWorkouts}</p>
              </div>
              <div className="stat-card">
                <h3>Calories Burned</h3>
                <p className="stat-value">{stats.totalCalories}</p>
              </div>
              <div className="stat-card">
                <h3>Active Goals</h3>
                <p className="stat-value">{stats.activeGoals}</p>
              </div>
              <div className="stat-card">
                <h3>Completed Goals</h3>
                <p className="stat-value">{stats.completedGoals}</p>
              </div>
            </div>

            <div className="chart-section">
              <h2>Progress Overview</h2>
              <ProgressChart workouts={workouts} />
            </div>

            <div className="recent-section">
              <h3>Recent Workouts</h3>
              <WorkoutList 
                workouts={workouts.slice(0, 5)} 
                onUpdate={fetchWorkouts}
              />
            </div>
          </div>
        )}

        {activeTab === 'workouts' && (
          <div className="workouts-section">
            <div className="section-header">
              <h2>My Workouts</h2>
              <button 
                className="btn-primary"
                onClick={() => setShowWorkoutForm(!showWorkoutForm)}
              >
                {showWorkoutForm ? 'Cancel' : 'Log Workout'}
              </button>
            </div>

            {showWorkoutForm && (
              <WorkoutForm 
                onSuccess={() => {
                  setShowWorkoutForm(false);
                  fetchWorkouts();
                }}
              />
            )}

            <WorkoutList workouts={workouts} onUpdate={fetchWorkouts} />
          </div>
        )}

        {activeTab === 'goals' && (
          <div className="goals-section">
            <div className="section-header">
              <h2>My Goals</h2>
              <button 
                className="btn-primary"
                onClick={() => setShowGoalForm(!showGoalForm)}
              >
                {showGoalForm ? 'Cancel' : 'Create Goal'}
              </button>
            </div>

            {showGoalForm && (
              <GoalForm 
                onSuccess={() => {
                  setShowGoalForm(false);
                  fetchGoals();
                }}
              />
            )}

            <GoalList goals={goals} onUpdate={fetchGoals} />
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
