package com.example.parkease.service;

import com.example.parkease.dto.LoginRequest;
import com.example.parkease.dto.RegisterRequest;
import com.example.parkease.model.User;
import com.example.parkease.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Map<String, Object> register(RegisterRequest request) {

        Map<String, Object> response = new HashMap<>();

        if (userRepository.findByEmail(request.email).isPresent()) {
            response.put("message", "User already exists");
            return response;
        }

        User user = new User();
        user.setName(request.name);
        user.setEmail(request.email);
        user.setPassword(request.password);
        user.setRole(request.role);

        userRepository.save(user);

        response.put("message", "Registration successful");
        return response;
    }

    public Map<String, Object> login(LoginRequest request) {

        Map<String, Object> response = new HashMap<>();

        return userRepository.findByEmail(request.email)
                .filter(u -> u.getPassword().equals(request.password))
                .map(u -> {
                    response.put("message", "Login successful");
                    response.put("role", u.getRole());
                    return response;
                })
                .orElseGet(() -> {
                    response.put("message", "Invalid credentials");
                    return response;
                });
    }
}
