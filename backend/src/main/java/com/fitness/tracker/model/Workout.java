package com.fitness.tracker.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "workouts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Workout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String exerciseName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private WorkoutType type;

    private Integer duration; // in minutes
    private Integer sets;
    private Integer reps;
    private Double distance; // in kilometers
    private Integer caloriesBurned;
    private String notes;

    @Column(nullable = false)
    private LocalDateTime workoutDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApprovalStatus status = ApprovalStatus.APPROVED;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    public enum WorkoutType {
        CARDIO, STRENGTH, FLEXIBILITY, SPORTS, OTHER
    }

    public enum ApprovalStatus {
        PENDING, APPROVED, REJECTED
    }
}
