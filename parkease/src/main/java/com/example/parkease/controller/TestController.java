package com.example.parkease.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/")
    public String home() {
        return "ParkEase Backend is running successfully 🚗🅿️";
    }
}
