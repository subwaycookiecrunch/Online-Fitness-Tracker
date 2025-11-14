package com.fitness.tracker.repository;

import com.fitness.tracker.model.Workout;
import com.fitness.tracker.model.Workout.ApprovalStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    List<Workout> findByUserId(Long userId);
    List<Workout> findByUserIdAndWorkoutDateBetween(Long userId, LocalDateTime start, LocalDateTime end);
    List<Workout> findByStatus(ApprovalStatus status);
    List<Workout> findByUserIdOrderByWorkoutDateDesc(Long userId);
}
