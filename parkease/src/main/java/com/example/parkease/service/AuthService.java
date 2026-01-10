package com.example.parkease.service;

import com.example.parkease.dto.LoginRequest;
import com.example.parkease.dto.RegisterRequest;
import com.example.parkease.model.User;
import com.example.parkease.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String register(RegisterRequest request) {

        if (userRepository.findByEmail(request.email).isPresent()) {
            return "User already exists";
        }

        User user = new User();
        user.setName(request.name);
        user.setEmail(request.email);
        user.setPassword(request.password); // plain text (temporary)
        user.setRole(request.role);

        userRepository.save(user);

        return "Registration successful";
    }

    public String login(LoginRequest request) {

        Optional<User> userOpt = userRepository.findByEmail(request.email);

        if (userOpt.isEmpty()) {
            return "User not found";
        }

        User user = userOpt.get();

        if (!user.getPassword().equals(request.password)) {
            return "Invalid password";
        }

        return "Login successful as " + user.getRole();
    }
}

