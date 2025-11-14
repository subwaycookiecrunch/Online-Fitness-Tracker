package com.fitness.tracker.service;

import com.fitness.tracker.model.Challenge;
import com.fitness.tracker.model.ChallengeProgress;
import com.fitness.tracker.model.User;
import com.fitness.tracker.repository.ChallengeRepository;
import com.fitness.tracker.repository.ChallengeProgressRepository;
import com.fitness.tracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChallengeService {
    
    private final ChallengeRepository challengeRepository;
    private final ChallengeProgressRepository progressRepository;
    private final UserRepository userRepository;
    
    @Transactional
    public Challenge createChallenge(Challenge challenge) {
        return challengeRepository.save(challenge);
    }
    
    public List<Challenge> getAllChallenges() {
        return challengeRepository.findAll();
    }
    
    public List<Challenge> getActiveChallenges() {
        return challengeRepository.findByActiveTrue();
    }
    
    public Challenge getChallengeById(Long id) {
        return challengeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Challenge not found"));
    }
    
    @Transactional
    public void joinChallenge(Long challengeId, Long userId) {
        Challenge challenge = challengeRepository.findById(challengeId)
                .orElseThrow(() -> new RuntimeException("Challenge not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        challenge.getParticipants().add(user);
        challengeRepository.save(challenge);
        
        ChallengeProgress progress = new ChallengeProgress();
        progress.setChallenge(challenge);
        progress.setUser(user);
        progress.setCurrentProgress(0.0);
        progressRepository.save(progress);
    }
    
    @Transactional
    public ChallengeProgress updateProgress(Long challengeId, Long userId, Double progress) {
        ChallengeProgress challengeProgress = progressRepository
                .findByChallengeIdAndUserId(challengeId, userId)
                .orElseThrow(() -> new RuntimeException("Challenge progress not found"));
        
        challengeProgress.setCurrentProgress(progress);
        return progressRepository.save(challengeProgress);
    }
    
    public List<ChallengeProgress> getChallengeLeaderboard(Long challengeId) {
        return progressRepository.findByChallengeIdOrderByProgressDesc(challengeId);
    }
    
    @Transactional
    public Challenge updateChallenge(Long id, Challenge challengeDetails) {
        Challenge challenge = challengeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Challenge not found"));
        
        challenge.setName(challengeDetails.getName());
        challenge.setDescription(challengeDetails.getDescription());
        challenge.setType(challengeDetails.getType());
        challenge.setTargetValue(challengeDetails.getTargetValue());
        challenge.setStartDate(challengeDetails.getStartDate());
        challenge.setEndDate(challengeDetails.getEndDate());
        challenge.setActive(challengeDetails.getActive());
        
        return challengeRepository.save(challenge);
    }
    
    @Transactional
    public void deleteChallenge(Long id) {
        challengeRepository.deleteById(id);
    }
}
