package com.fitness.tracker.service;

import com.fitness.tracker.model.Goal;
import com.fitness.tracker.model.Goal.GoalStatus;
import com.fitness.tracker.model.User;
import com.fitness.tracker.repository.GoalRepository;
import com.fitness.tracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GoalService {
    
    private final GoalRepository goalRepository;
    private final UserRepository userRepository;
    
    @Transactional
    public Goal createGoal(Long userId, Goal goal) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        goal.setUser(user);
        return goalRepository.save(goal);
    }
    
    public List<Goal> getUserGoals(Long userId) {
        return goalRepository.findByUserId(userId);
    }
    
    public List<Goal> getUserActiveGoals(Long userId) {
        return goalRepository.findByUserIdAndStatus(userId, GoalStatus.IN_PROGRESS);
    }
    
    @Transactional
    public Goal updateGoal(Long id, Goal goalDetails) {
        Goal goal = goalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Goal not found"));
        
        goal.setTitle(goalDetails.getTitle());
        goal.setDescription(goalDetails.getDescription());
        goal.setType(goalDetails.getType());
        goal.setTargetValue(goalDetails.getTargetValue());
        goal.setCurrentValue(goalDetails.getCurrentValue());
        goal.setTargetDate(goalDetails.getTargetDate());
        goal.setStatus(goalDetails.getStatus());
        
        return goalRepository.save(goal);
    }
    
    @Transactional
    public Goal updateGoalProgress(Long id, Double progress) {
        Goal goal = goalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Goal not found"));
        
        goal.setCurrentValue(progress);
        
        if (goal.getTargetValue() != null && progress >= goal.getTargetValue()) {
            goal.setStatus(GoalStatus.COMPLETED);
        }
        
        return goalRepository.save(goal);
    }
    
    @Transactional
    public void deleteGoal(Long id) {
        goalRepository.deleteById(id);
    }
}
