import { goalAPI } from '../services/api';

function GoalList({ goals, onUpdate }) {
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      try {
        await goalAPI.deleteGoal(id);
        onUpdate();
      } catch (error) {
        console.error('Error deleting goal:', error);
      }
    }
  };

  const calculateProgress = (goal) => {
    if (!goal.targetValue) return 0;
    return Math.min((goal.currentValue / goal.targetValue) * 100, 100).toFixed(1);
  };

  if (goals.length === 0) {
    return <p className="empty-message">No goals set yet. Create your first fitness goal!</p>;
  }

  return (
    <div className="goal-list">
      {goals.map((goal) => (
        <div key={goal.id} className="goal-card">
          <div className="goal-header">
            <h4>{goal.title}</h4>
            <span className={`goal-status ${goal.status.toLowerCase()}`}>
              {goal.status.replace('_', ' ')}
            </span>
          </div>
          <p className="goal-description">{goal.description}</p>
          <div className="goal-details">
            <p><strong>Type:</strong> {goal.type.replace('_', ' ')}</p>
            <p><strong>Target:</strong> {goal.targetValue}</p>
            <p><strong>Current:</strong> {goal.currentValue}</p>
            <p><strong>Due:</strong> {new Date(goal.targetDate).toLocaleDateString()}</p>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${calculateProgress(goal)}%` }}
            />
          </div>
          <p className="progress-text">{calculateProgress(goal)}% Complete</p>
          <div className="goal-actions">
            <button onClick={() => handleDelete(goal.id)} className="btn-delete">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GoalList;
