package com.fitness.tracker.controller;

import com.fitness.tracker.model.Workout;
import com.fitness.tracker.model.User;
import com.fitness.tracker.service.WorkoutService;
import com.fitness.tracker.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/workouts")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class WorkoutController {
    
    private final WorkoutService workoutService;
    private final UserService userService;
    
    @PostMapping
    public ResponseEntity<?> createWorkout(@RequestBody Workout workout, Authentication authentication) {
        String username = authentication.getName();
        User user = userService.getUserByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Workout createdWorkout = workoutService.createWorkout(user.getId(), workout);
        return ResponseEntity.ok(createdWorkout);
    }
    
    @GetMapping
    public ResponseEntity<?> getUserWorkouts(Authentication authentication) {
        String username = authentication.getName();
        User user = userService.getUserByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        List<Workout> workouts = workoutService.getUserWorkouts(user.getId());
        return ResponseEntity.ok(workouts);
    }
    
    @GetMapping("/range")
    public ResponseEntity<?> getWorkoutsByDateRange(
            @RequestParam String start,
            @RequestParam String end,
            Authentication authentication) {
        String username = authentication.getName();
        User user = userService.getUserByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        LocalDateTime startDate = LocalDateTime.parse(start);
        LocalDateTime endDate = LocalDateTime.parse(end);
        
        List<Workout> workouts = workoutService.getUserWorkoutsByDateRange(user.getId(), startDate, endDate);
        return ResponseEntity.ok(workouts);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateWorkout(@PathVariable Long id, @RequestBody Workout workout) {
        Workout updatedWorkout = workoutService.updateWorkout(id, workout);
        return ResponseEntity.ok(updatedWorkout);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteWorkout(@PathVariable Long id) {
        workoutService.deleteWorkout(id);
        return ResponseEntity.ok().build();
    }
}
