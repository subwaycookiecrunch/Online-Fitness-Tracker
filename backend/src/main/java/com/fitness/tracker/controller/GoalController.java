package com.fitness.tracker.controller;

import com.fitness.tracker.model.Goal;
import com.fitness.tracker.model.User;
import com.fitness.tracker.service.GoalService;
import com.fitness.tracker.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class GoalController {
    
    private final GoalService goalService;
    private final UserService userService;
    
    @PostMapping
    public ResponseEntity<?> createGoal(@RequestBody Goal goal, Authentication authentication) {
        String username = authentication.getName();
        User user = userService.getUserByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Goal createdGoal = goalService.createGoal(user.getId(), goal);
        return ResponseEntity.ok(createdGoal);
    }
    
    @GetMapping
    public ResponseEntity<?> getUserGoals(Authentication authentication) {
        String username = authentication.getName();
        User user = userService.getUserByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        List<Goal> goals = goalService.getUserGoals(user.getId());
        return ResponseEntity.ok(goals);
    }
    
    @GetMapping("/active")
    public ResponseEntity<?> getActiveGoals(Authentication authentication) {
        String username = authentication.getName();
        User user = userService.getUserByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        List<Goal> goals = goalService.getUserActiveGoals(user.getId());
        return ResponseEntity.ok(goals);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateGoal(@PathVariable Long id, @RequestBody Goal goal) {
        Goal updatedGoal = goalService.updateGoal(id, goal);
        return ResponseEntity.ok(updatedGoal);
    }
    
    @PutMapping("/{id}/progress")
    public ResponseEntity<?> updateProgress(@PathVariable Long id, @RequestParam Double progress) {
        Goal updatedGoal = goalService.updateGoalProgress(id, progress);
        return ResponseEntity.ok(updatedGoal);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteGoal(@PathVariable Long id) {
        goalService.deleteGoal(id);
        return ResponseEntity.ok().build();
    }
}
