import { workoutAPI } from '../services/api';

function WorkoutList({ workouts, onUpdate }) {
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      try {
        await workoutAPI.deleteWorkout(id);
        onUpdate();
      } catch (error) {
        console.error('Error deleting workout:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (workouts.length === 0) {
    return <p className="empty-message">No workouts logged yet. Start tracking your fitness!</p>;
  }

  return (
    <div className="workout-list">
      {workouts.map((workout) => (
        <div key={workout.id} className="workout-card">
          <div className="workout-header">
            <h4>{workout.exerciseName}</h4>
            <span className={`workout-type ${workout.type.toLowerCase()}`}>
              {workout.type}
            </span>
          </div>
          <div className="workout-details">
            <p><strong>Date:</strong> {formatDate(workout.workoutDate)}</p>
            {workout.duration && <p><strong>Duration:</strong> {workout.duration} min</p>}
            {workout.caloriesBurned && <p><strong>Calories:</strong> {workout.caloriesBurned} kcal</p>}
            {workout.sets && <p><strong>Sets:</strong> {workout.sets}</p>}
            {workout.reps && <p><strong>Reps:</strong> {workout.reps}</p>}
            {workout.distance && <p><strong>Distance:</strong> {workout.distance} km</p>}
            {workout.notes && <p><strong>Notes:</strong> {workout.notes}</p>}
          </div>
          <div className="workout-actions">
            <button onClick={() => handleDelete(workout.id)} className="btn-delete">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WorkoutList;
