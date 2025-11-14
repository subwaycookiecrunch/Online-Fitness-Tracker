import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { challengeAPI } from '../services/api';
import '../styles/Dashboard.css';

function Challenges() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      const response = await challengeAPI.getChallenges();
      setChallenges(response.data);
    } catch (error) {
      console.error('Error fetching challenges:', error);
    }
  };

  const fetchLeaderboard = async (challengeId) => {
    try {
      const response = await challengeAPI.getLeaderboard(challengeId);
      setLeaderboard(response.data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  const handleJoinChallenge = async (challengeId) => {
    try {
      await challengeAPI.joinChallenge(challengeId);
      alert('Successfully joined the challenge!');
      fetchChallenges();
    } catch (error) {
      console.error('Error joining challenge:', error);
      alert('Failed to join challenge');
    }
  };

  const handleViewLeaderboard = async (challenge) => {
    setSelectedChallenge(challenge);
    await fetchLeaderboard(challenge.id);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const isActive = (challenge) => {
    const now = new Date();
    const start = new Date(challenge.startDate);
    const end = new Date(challenge.endDate);
    return challenge.active && now >= start && now <= end;
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <h1>Fitness Challenges</h1>
        <div className="nav-links">
          <span className="user-name">{user.username}</span>
          <button onClick={() => navigate('/dashboard')} className="btn-nav">Dashboard</button>
          <button onClick={handleLogout} className="btn-nav">Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        {selectedChallenge ? (
          <div className="leaderboard-section">
            <div className="section-header">
              <h2>{selectedChallenge.name} - Leaderboard</h2>
              <button onClick={() => setSelectedChallenge(null)} className="btn-primary">
                Back to Challenges
              </button>
            </div>
            
            <div className="challenge-info">
              <p><strong>Description:</strong> {selectedChallenge.description}</p>
              <p><strong>Type:</strong> {selectedChallenge.type}</p>
              <p><strong>Target:</strong> {selectedChallenge.targetValue}</p>
              <p><strong>Period:</strong> {formatDate(selectedChallenge.startDate)} - {formatDate(selectedChallenge.endDate)}</p>
            </div>

            <div className="leaderboard">
              <h3>Rankings</h3>
              {leaderboard.length === 0 ? (
                <p className="empty-message">No participants yet</p>
              ) : (
                <div className="leaderboard-list">
                  {leaderboard.map((entry, index) => (
                    <div key={entry.id} className={`leaderboard-item rank-${index + 1}`}>
                      <div className="rank">#{index + 1}</div>
                      <div className="user-info">
                        <strong>{entry.user?.username || 'User'}</strong>
                      </div>
                      <div className="progress-info">
                        <span className="progress-value">{entry.currentProgress}</span>
                        <div className="progress-bar-small">
                          <div 
                            className="progress-fill" 
                            style={{ 
                              width: `${Math.min((entry.currentProgress / selectedChallenge.targetValue) * 100, 100)}%` 
                            }}
                          />
                        </div>
                        <span className="progress-percentage">
                          {((entry.currentProgress / selectedChallenge.targetValue) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="challenges-section">
            <h2>Available Challenges</h2>
            {challenges.length === 0 ? (
              <p className="empty-message">No challenges available at the moment</p>
            ) : (
              <div className="challenges-grid">
                {challenges.map((challenge) => (
                  <div key={challenge.id} className="challenge-card">
                    <div className="challenge-header">
                      <h3>{challenge.name}</h3>
                      {isActive(challenge) ? (
                        <span className="badge active">Active</span>
                      ) : (
                        <span className="badge inactive">Upcoming</span>
                      )}
                    </div>
                    <p className="challenge-description">{challenge.description}</p>
                    <div className="challenge-details">
                      <div className="detail-item">
                        <strong>Type:</strong> {challenge.type}
                      </div>
                      <div className="detail-item">
                        <strong>Target:</strong> {challenge.targetValue}
                      </div>
                      <div className="detail-item">
                        <strong>Start:</strong> {formatDate(challenge.startDate)}
                      </div>
                      <div className="detail-item">
                        <strong>End:</strong> {formatDate(challenge.endDate)}
                      </div>
                      <div className="detail-item">
                        <strong>Participants:</strong> {challenge.participants?.length || 0}
                      </div>
                    </div>
                    <div className="challenge-actions">
                      <button 
                        onClick={() => handleViewLeaderboard(challenge)} 
                        className="btn-secondary"
                      >
                        View Leaderboard
                      </button>
                      <button 
                        onClick={() => handleJoinChallenge(challenge.id)} 
                        className="btn-primary"
                        disabled={!isActive(challenge)}
                      >
                        Join Challenge
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Challenges;
