package com.fitness.tracker.config;

import com.fitness.tracker.model.*;
import com.fitness.tracker.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {
    
    private final PasswordEncoder passwordEncoder;
    
    @Bean
    public CommandLineRunner initializeData(
            UserRepository userRepository,
            ChallengeRepository challengeRepository) {
        return args -> {
            // Create admin user if not exists
            if (!userRepository.existsByUsername("admin")) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setEmail("admin@fitness.com");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setFullName("System Administrator");
                admin.setRole(User.Role.ADMIN);
                admin.setActive(true);
                userRepository.save(admin);
                System.out.println("Admin user created - username: admin, password: admin123");
            }
            
            // Create demo user if not exists
            if (!userRepository.existsByUsername("demo")) {
                User demo = new User();
                demo.setUsername("demo");
                demo.setEmail("demo@fitness.com");
                demo.setPassword(passwordEncoder.encode("demo123"));
                demo.setFullName("Demo User");
                demo.setRole(User.Role.USER);
                demo.setAge(25);
                demo.setWeight(70.0);
                demo.setHeight(175.0);
                demo.setGender("MALE");
                demo.setFitnessLevel("INTERMEDIATE");
                demo.setActive(true);
                userRepository.save(demo);
                System.out.println("Demo user created - username: demo, password: demo123");
            }
            
            // Create sample challenges
            if (challengeRepository.count() == 0) {
                Challenge challenge1 = new Challenge();
                challenge1.setName("30-Day Cardio Challenge");
                challenge1.setDescription("Complete 30 cardio workouts in 30 days to improve your cardiovascular health!");
                challenge1.setType(Challenge.ChallengeType.WORKOUTS);
                challenge1.setTargetValue(30.0);
                challenge1.setStartDate(LocalDate.now());
                challenge1.setEndDate(LocalDate.now().plusDays(30));
                challenge1.setActive(true);
                challengeRepository.save(challenge1);
                
                Challenge challenge2 = new Challenge();
                challenge2.setName("Run 100 Miles");
                challenge2.setDescription("Run a total of 100 miles this month. Track your progress and compete with others!");
                challenge2.setType(Challenge.ChallengeType.DISTANCE);
                challenge2.setTargetValue(100.0);
                challenge2.setStartDate(LocalDate.now());
                challenge2.setEndDate(LocalDate.now().plusDays(30));
                challenge2.setActive(true);
                challengeRepository.save(challenge2);
                
                Challenge challenge3 = new Challenge();
                challenge3.setName("Burn 10,000 Calories");
                challenge3.setDescription("Burn a total of 10,000 calories through workouts. Every calorie counts!");
                challenge3.setType(Challenge.ChallengeType.CALORIES);
                challenge3.setTargetValue(10000.0);
                challenge3.setStartDate(LocalDate.now());
                challenge3.setEndDate(LocalDate.now().plusDays(30));
                challenge3.setActive(true);
                challengeRepository.save(challenge3);
                
                System.out.println("Sample challenges created");
            }
        };
    }
}
