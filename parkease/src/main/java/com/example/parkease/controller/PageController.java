package com.example.parkease.controller;

import com.example.parkease.model.User;
import com.example.parkease.repository.UserRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class PageController {

    private final UserRepository userRepository;

    public PageController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // OPEN LOGIN PAGE
    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }

    // OPEN REGISTER PAGE
    @GetMapping("/register")
    public String registerPage() {
        return "register";
    }

    // HANDLE REGISTER FORM
    @PostMapping("/register-page")
    public String registerUser(@RequestParam String name,
                               @RequestParam String email,
                               @RequestParam String password,
                               @RequestParam String role) {

        // Check if user already exists
        if (userRepository.findByEmail(email).isPresent()) {
            return "register"; // stay on register page
        }

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(password);
        user.setRole(role);

        userRepository.save(user);

        return "redirect:/login";
    }

    // HANDLE LOGIN FORM
    @PostMapping("/login-page")
public String loginUser(@RequestParam String email,
                        @RequestParam String password,
                        @RequestParam String role) {

    return userRepository.findByEmail(email)
            .filter(user ->
                    user.getPassword().equals(password) &&
                    user.getRole().equals(role)
            )
            .map(user -> {
                if (role.equals("ADMIN")) {
                    return "redirect:/admin-home";
                } else if (role.equals("DRIVER")) {
                    return "redirect:/driver-home";
                } else {
                    return "redirect:/provider-home";
                }
            })
            .orElse("login");
}
    @GetMapping("/admin-home")
public String adminHome() {
    return "admin-home";
}

@GetMapping("/driver-home")
public String driverHome() {
    return "driver-home";
}

@GetMapping("/provider-home")
public String providerHome() {
    return "provider-home";
}
}
