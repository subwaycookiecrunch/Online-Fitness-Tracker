package com.fitness.tracker.controller;

import com.fitness.tracker.model.Challenge;
import com.fitness.tracker.model.ChallengeProgress;
import com.fitness.tracker.model.User;
import com.fitness.tracker.service.ChallengeService;
import com.fitness.tracker.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/challenges")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ChallengeController {
    
    private final ChallengeService challengeService;
    private final UserService userService;
    
    @GetMapping
    public ResponseEntity<?> getAllChallenges() {
        List<Challenge> challenges = challengeService.getActiveChallenges();
        return ResponseEntity.ok(challenges);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getChallengeById(@PathVariable Long id) {
        Challenge challenge = challengeService.getChallengeById(id);
        return ResponseEntity.ok(challenge);
    }
    
    @PostMapping("/{challengeId}/join")
    public ResponseEntity<?> joinChallenge(@PathVariable Long challengeId, Authentication authentication) {
        String username = authentication.getName();
        User user = userService.getUserByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        challengeService.joinChallenge(challengeId, user.getId());
        return ResponseEntity.ok().build();
    }
    
    @PutMapping("/{challengeId}/progress")
    public ResponseEntity<?> updateProgress(
            @PathVariable Long challengeId,
            @RequestParam Double progress,
            Authentication authentication) {
        String username = authentication.getName();
        User user = userService.getUserByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        ChallengeProgress updated = challengeService.updateProgress(challengeId, user.getId(), progress);
        return ResponseEntity.ok(updated);
    }
    
    @GetMapping("/{challengeId}/leaderboard")
    public ResponseEntity<?> getLeaderboard(@PathVariable Long challengeId) {
        List<ChallengeProgress> leaderboard = challengeService.getChallengeLeaderboard(challengeId);
        return ResponseEntity.ok(leaderboard);
    }
}
