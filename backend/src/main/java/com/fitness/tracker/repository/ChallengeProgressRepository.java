package com.fitness.tracker.repository;

import com.fitness.tracker.model.ChallengeProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChallengeProgressRepository extends JpaRepository<ChallengeProgress, Long> {
    Optional<ChallengeProgress> findByChallengeIdAndUserId(Long challengeId, Long userId);
    List<ChallengeProgress> findByChallengeId(Long challengeId);
    
    @Query("SELECT cp FROM ChallengeProgress cp WHERE cp.challenge.id = :challengeId ORDER BY cp.currentProgress DESC")
    List<ChallengeProgress> findByChallengeIdOrderByProgressDesc(Long challengeId);
}
