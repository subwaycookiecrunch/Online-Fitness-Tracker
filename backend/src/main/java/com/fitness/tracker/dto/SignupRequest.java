package com.fitness.tracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignupRequest {
    private String username;
    private String email;
    private String password;
    private String fullName;
    private Integer age;
    private Double weight;
    private Double height;
    private String gender;
    private String fitnessLevel;
}
