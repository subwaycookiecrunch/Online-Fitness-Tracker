package com.fitness.tracker.controller;

import com.fitness.tracker.dto.MessageResponse;
import com.fitness.tracker.model.Challenge;
import com.fitness.tracker.model.User;
import com.fitness.tracker.model.Workout;
import com.fitness.tracker.service.ChallengeService;
import com.fitness.tracker.service.UserService;
import com.fitness.tracker.service.WorkoutService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {
    
    private final UserService userService;
    private final WorkoutService workoutService;
    private final ChallengeService challengeService;
    
    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    
    @PutMapping("/users/{id}/deactivate")
    public ResponseEntity<?> deactivateUser(@PathVariable Long id) {
        userService.deactivateUser(id);
        return ResponseEntity.ok(new MessageResponse("User deactivated successfully"));
    }
    
    @PutMapping("/users/{id}/activate")
    public ResponseEntity<?> activateUser(@PathVariable Long id) {
        userService.activateUser(id);
        return ResponseEntity.ok(new MessageResponse("User activated successfully"));
    }
    
    @GetMapping("/workouts/pending")
    public ResponseEntity<?> getPendingWorkouts() {
        List<Workout> workouts = workoutService.getPendingWorkouts();
        return ResponseEntity.ok(workouts);
    }
    
    @PutMapping("/workouts/{id}/approve")
    public ResponseEntity<?> approveWorkout(@PathVariable Long id) {
        Workout workout = workoutService.approveWorkout(id);
        return ResponseEntity.ok(workout);
    }
    
    @PutMapping("/workouts/{id}/reject")
    public ResponseEntity<?> rejectWorkout(@PathVariable Long id) {
        Workout workout = workoutService.rejectWorkout(id);
        return ResponseEntity.ok(workout);
    }
    
    @PostMapping("/challenges")
    public ResponseEntity<?> createChallenge(@RequestBody Challenge challenge) {
        Challenge created = challengeService.createChallenge(challenge);
        return ResponseEntity.ok(created);
    }
    
    @PutMapping("/challenges/{id}")
    public ResponseEntity<?> updateChallenge(@PathVariable Long id, @RequestBody Challenge challenge) {
        Challenge updated = challengeService.updateChallenge(id, challenge);
        return ResponseEntity.ok(updated);
    }
    
    @DeleteMapping("/challenges/{id}")
    public ResponseEntity<?> deleteChallenge(@PathVariable Long id) {
        challengeService.deleteChallenge(id);
        return ResponseEntity.ok(new MessageResponse("Challenge deleted successfully"));
    }
}
