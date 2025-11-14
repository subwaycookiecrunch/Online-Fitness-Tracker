import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => axiosInstance.post('/auth/login', credentials),
  signup: (userData) => axiosInstance.post('/auth/signup', userData),
};

// User API
export const userAPI = {
  getCurrentUser: () => axiosInstance.get('/users/me'),
  updateProfile: (userData) => axiosInstance.put('/users/me', userData),
};

// Workout API
export const workoutAPI = {
  getWorkouts: () => axiosInstance.get('/workouts'),
  createWorkout: (workout) => axiosInstance.post('/workouts', workout),
  updateWorkout: (id, workout) => axiosInstance.put(`/workouts/${id}`, workout),
  deleteWorkout: (id) => axiosInstance.delete(`/workouts/${id}`),
  getWorkoutsByRange: (start, end) => 
    axiosInstance.get(`/workouts/range?start=${start}&end=${end}`),
};

// Goal API
export const goalAPI = {
  getGoals: () => axiosInstance.get('/goals'),
  getActiveGoals: () => axiosInstance.get('/goals/active'),
  createGoal: (goal) => axiosInstance.post('/goals', goal),
  updateGoal: (id, goal) => axiosInstance.put(`/goals/${id}`, goal),
  updateProgress: (id, progress) => 
    axiosInstance.put(`/goals/${id}/progress?progress=${progress}`),
  deleteGoal: (id) => axiosInstance.delete(`/goals/${id}`),
};

// Challenge API
export const challengeAPI = {
  getChallenges: () => axiosInstance.get('/challenges'),
  getChallenge: (id) => axiosInstance.get(`/challenges/${id}`),
  joinChallenge: (id) => axiosInstance.post(`/challenges/${id}/join`),
  updateProgress: (id, progress) => 
    axiosInstance.put(`/challenges/${id}/progress?progress=${progress}`),
  getLeaderboard: (id) => axiosInstance.get(`/challenges/${id}/leaderboard`),
};

// Admin API
export const adminAPI = {
  getUsers: () => axiosInstance.get('/admin/users'),
  activateUser: (id) => axiosInstance.put(`/admin/users/${id}/activate`),
  deactivateUser: (id) => axiosInstance.put(`/admin/users/${id}/deactivate`),
  getPendingWorkouts: () => axiosInstance.get('/admin/workouts/pending'),
  approveWorkout: (id) => axiosInstance.put(`/admin/workouts/${id}/approve`),
  rejectWorkout: (id) => axiosInstance.put(`/admin/workouts/${id}/reject`),
  createChallenge: (challenge) => axiosInstance.post('/admin/challenges', challenge),
  updateChallenge: (id, challenge) => 
    axiosInstance.put(`/admin/challenges/${id}`, challenge),
  deleteChallenge: (id) => axiosInstance.delete(`/admin/challenges/${id}`),
};

export default axiosInstance;
