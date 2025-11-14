package com.fitness.tracker.service;

import com.fitness.tracker.model.Workout;
import com.fitness.tracker.model.Workout.ApprovalStatus;
import com.fitness.tracker.model.User;
import com.fitness.tracker.repository.WorkoutRepository;
import com.fitness.tracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkoutService {
    
    private final WorkoutRepository workoutRepository;
    private final UserRepository userRepository;
    
    @Transactional
    public Workout createWorkout(Long userId, Workout workout) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        workout.setUser(user);
        return workoutRepository.save(workout);
    }
    
    public List<Workout> getUserWorkouts(Long userId) {
        return workoutRepository.findByUserIdOrderByWorkoutDateDesc(userId);
    }
    
    public List<Workout> getUserWorkoutsByDateRange(Long userId, LocalDateTime start, LocalDateTime end) {
        return workoutRepository.findByUserIdAndWorkoutDateBetween(userId, start, end);
    }
    
    public List<Workout> getPendingWorkouts() {
        return workoutRepository.findByStatus(ApprovalStatus.PENDING);
    }
    
    @Transactional
    public Workout updateWorkout(Long id, Workout workoutDetails) {
        Workout workout = workoutRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Workout not found"));
        
        workout.setExerciseName(workoutDetails.getExerciseName());
        workout.setType(workoutDetails.getType());
        workout.setDuration(workoutDetails.getDuration());
        workout.setSets(workoutDetails.getSets());
        workout.setReps(workoutDetails.getReps());
        workout.setDistance(workoutDetails.getDistance());
        workout.setCaloriesBurned(workoutDetails.getCaloriesBurned());
        workout.setNotes(workoutDetails.getNotes());
        workout.setWorkoutDate(workoutDetails.getWorkoutDate());
        
        return workoutRepository.save(workout);
    }
    
    @Transactional
    public Workout approveWorkout(Long id) {
        Workout workout = workoutRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Workout not found"));
        workout.setStatus(ApprovalStatus.APPROVED);
        return workoutRepository.save(workout);
    }
    
    @Transactional
    public Workout rejectWorkout(Long id) {
        Workout workout = workoutRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Workout not found"));
        workout.setStatus(ApprovalStatus.REJECTED);
        return workoutRepository.save(workout);
    }
    
    @Transactional
    public void deleteWorkout(Long id) {
        workoutRepository.deleteById(id);
    }
}
