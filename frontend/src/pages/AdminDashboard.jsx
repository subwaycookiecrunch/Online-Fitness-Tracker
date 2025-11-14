import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { adminAPI } from '../services/api';
import '../styles/Dashboard.css';

function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [pendingWorkouts, setPendingWorkouts] = useState([]);
  const [activeTab, setActiveTab] = useState('users');
  const [newChallenge, setNewChallenge] = useState({
    name: '',
    description: '',
    type: 'DISTANCE',
    targetValue: '',
    startDate: '',
    endDate: '',
    active: true
  });

  useEffect(() => {
    fetchUsers();
    fetchPendingWorkouts();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await adminAPI.getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchPendingWorkouts = async () => {
    try {
      const response = await adminAPI.getPendingWorkouts();
      setPendingWorkouts(response.data);
    } catch (error) {
      console.error('Error fetching pending workouts:', error);
    }
  };

  const handleUserToggle = async (userId, active) => {
    try {
      if (active) {
        await adminAPI.deactivateUser(userId);
      } else {
        await adminAPI.activateUser(userId);
      }
      fetchUsers();
    } catch (error) {
      console.error('Error toggling user:', error);
    }
  };

  const handleWorkoutApproval = async (workoutId, approve) => {
    try {
      if (approve) {
        await adminAPI.approveWorkout(workoutId);
      } else {
        await adminAPI.rejectWorkout(workoutId);
      }
      fetchPendingWorkouts();
    } catch (error) {
      console.error('Error handling workout approval:', error);
    }
  };

  const handleCreateChallenge = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...newChallenge,
        targetValue: parseFloat(newChallenge.targetValue),
      };
      await adminAPI.createChallenge(dataToSend);
      alert('Challenge created successfully!');
      setNewChallenge({
        name: '',
        description: '',
        type: 'DISTANCE',
        targetValue: '',
        startDate: '',
        endDate: '',
        active: true
      });
    } catch (error) {
      console.error('Error creating challenge:', error);
      alert('Failed to create challenge');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <h1>Admin Dashboard</h1>
        <div className="nav-links">
          <span className="user-name">Admin: {user.username}</span>
          <button onClick={handleLogout} className="btn-nav">Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="tabs">
          <button 
            className={activeTab === 'users' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('users')}
          >
            User Management
          </button>
          <button 
            className={activeTab === 'workouts' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('workouts')}
          >
            Pending Workouts
          </button>
          <button 
            className={activeTab === 'challenges' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('challenges')}
          >
            Create Challenge
          </button>
        </div>

        {activeTab === 'users' && (
          <div className="admin-section">
            <h2>User Management</h2>
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Full Name</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>{u.username}</td>
                      <td>{u.email}</td>
                      <td>{u.fullName}</td>
                      <td>{u.role}</td>
                      <td>
                        <span className={`status ${u.active ? 'active' : 'inactive'}`}>
                          {u.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <button 
                          onClick={() => handleUserToggle(u.id, u.active)}
                          className={u.active ? 'btn-delete' : 'btn-success'}
                        >
                          {u.active ? 'Deactivate' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'workouts' && (
          <div className="admin-section">
            <h2>Pending Workout Approvals</h2>
            {pendingWorkouts.length === 0 ? (
              <p className="empty-message">No pending workouts for approval</p>
            ) : (
              <div className="workout-list">
                {pendingWorkouts.map((workout) => (
                  <div key={workout.id} className="workout-card">
                    <div className="workout-header">
                      <h4>{workout.exerciseName}</h4>
                      <span className={`workout-type ${workout.type.toLowerCase()}`}>
                        {workout.type}
                      </span>
                    </div>
                    <div className="workout-details">
                      <p><strong>Date:</strong> {new Date(workout.workoutDate).toLocaleString()}</p>
                      {workout.duration && <p><strong>Duration:</strong> {workout.duration} min</p>}
                      {workout.caloriesBurned && <p><strong>Calories:</strong> {workout.caloriesBurned} kcal</p>}
                      {workout.notes && <p><strong>Notes:</strong> {workout.notes}</p>}
                    </div>
                    <div className="workout-actions">
                      <button 
                        onClick={() => handleWorkoutApproval(workout.id, true)} 
                        className="btn-success"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleWorkoutApproval(workout.id, false)} 
                        className="btn-delete"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="admin-section">
            <h2>Create New Challenge</h2>
            <div className="form-card">
              <form onSubmit={handleCreateChallenge}>
                <div className="form-group">
                  <label>Challenge Name *</label>
                  <input
                    type="text"
                    value={newChallenge.name}
                    onChange={(e) => setNewChallenge({ ...newChallenge, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description *</label>
                  <textarea
                    value={newChallenge.description}
                    onChange={(e) => setNewChallenge({ ...newChallenge, description: e.target.value })}
                    rows="3"
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Type *</label>
                    <select
                      value={newChallenge.type}
                      onChange={(e) => setNewChallenge({ ...newChallenge, type: e.target.value })}
                    >
                      <option value="DISTANCE">Distance</option>
                      <option value="CALORIES">Calories</option>
                      <option value="WORKOUTS">Workouts</option>
                      <option value="DURATION">Duration</option>
                      <option value="CUSTOM">Custom</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Target Value *</label>
                    <input
                      type="number"
                      step="0.1"
                      value={newChallenge.targetValue}
                      onChange={(e) => setNewChallenge({ ...newChallenge, targetValue: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Start Date *</label>
                    <input
                      type="date"
                      value={newChallenge.startDate}
                      onChange={(e) => setNewChallenge({ ...newChallenge, startDate: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>End Date *</label>
                    <input
                      type="date"
                      value={newChallenge.endDate}
                      onChange={(e) => setNewChallenge({ ...newChallenge, endDate: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn-primary">Create Challenge</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
