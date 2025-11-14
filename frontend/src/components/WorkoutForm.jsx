import { useState } from 'react';
import { workoutAPI } from '../services/api';

function WorkoutForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    exerciseName: '',
    type: 'CARDIO',
    duration: '',
    sets: '',
    reps: '',
    distance: '',
    caloriesBurned: '',
    notes: '',
    workoutDate: new Date().toISOString().slice(0, 16)
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        duration: formData.duration ? parseInt(formData.duration) : null,
        sets: formData.sets ? parseInt(formData.sets) : null,
        reps: formData.reps ? parseInt(formData.reps) : null,
        distance: formData.distance ? parseFloat(formData.distance) : null,
        caloriesBurned: formData.caloriesBurned ? parseInt(formData.caloriesBurned) : null,
      };
      
      await workoutAPI.createWorkout(dataToSend);
      onSuccess();
    } catch (error) {
      console.error('Error creating workout:', error);
      alert('Failed to log workout');
    }
  };

  return (
    <div className="form-card">
      <h3>Log Workout</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Exercise Name *</label>
            <input
              type="text"
              value={formData.exerciseName}
              onChange={(e) => setFormData({ ...formData, exerciseName: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Type *</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="CARDIO">Cardio</option>
              <option value="STRENGTH">Strength</option>
              <option value="FLEXIBILITY">Flexibility</option>
              <option value="SPORTS">Sports</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Duration (minutes)</label>
            <input
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Calories Burned</label>
            <input
              type="number"
              value={formData.caloriesBurned}
              onChange={(e) => setFormData({ ...formData, caloriesBurned: e.target.value })}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Sets</label>
            <input
              type="number"
              value={formData.sets}
              onChange={(e) => setFormData({ ...formData, sets: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Reps</label>
            <input
              type="number"
              value={formData.reps}
              onChange={(e) => setFormData({ ...formData, reps: e.target.value })}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Distance (km)</label>
          <input
            type="number"
            step="0.1"
            value={formData.distance}
            onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Workout Date *</label>
          <input
            type="datetime-local"
            value={formData.workoutDate}
            onChange={(e) => setFormData({ ...formData, workoutDate: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Notes</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows="3"
          />
        </div>
        <button type="submit" className="btn-primary">Log Workout</button>
      </form>
    </div>
  );
}

export default WorkoutForm;
