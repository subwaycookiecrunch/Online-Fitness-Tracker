import { useState } from 'react';
import { goalAPI } from '../services/api';

function GoalForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'WEIGHT_LOSS',
    targetValue: '',
    currentValue: '0',
    startDate: new Date().toISOString().split('T')[0],
    targetDate: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        targetValue: parseFloat(formData.targetValue),
        currentValue: parseFloat(formData.currentValue),
      };
      
      await goalAPI.createGoal(dataToSend);
      onSuccess();
    } catch (error) {
      console.error('Error creating goal:', error);
      alert('Failed to create goal');
    }
  };

  return (
    <div className="form-card">
      <h3>Create Goal</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows="3"
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Type *</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="WEIGHT_LOSS">Weight Loss</option>
              <option value="MUSCLE_GAIN">Muscle Gain</option>
              <option value="CARDIO_IMPROVEMENT">Cardio Improvement</option>
              <option value="STRENGTH_IMPROVEMENT">Strength Improvement</option>
              <option value="CUSTOM">Custom</option>
            </select>
          </div>
          <div className="form-group">
            <label>Target Value *</label>
            <input
              type="number"
              step="0.1"
              value={formData.targetValue}
              onChange={(e) => setFormData({ ...formData, targetValue: e.target.value })}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Start Date *</label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Target Date *</label>
            <input
              type="date"
              value={formData.targetDate}
              onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn-primary">Create Goal</button>
      </form>
    </div>
  );
}

export default GoalForm;
