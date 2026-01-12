package com.example.parkease.controller;

import com.example.parkease.repository.BookingRepository;
import com.example.parkease.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;

    public AdminController(UserRepository userRepository,
                           BookingRepository bookingRepository) {
        this.userRepository = userRepository;
        this.bookingRepository = bookingRepository;
    }

    @GetMapping("/users")
    public Object users() {
        return userRepository.findAll();
    }

    @GetMapping("/bookings")
    public Object bookings() {
        return bookingRepository.findAll();
    }

    @GetMapping("/reports")
    public Map<String, Object> reports() {

        Map<String, Object> report = new HashMap<>();
        report.put("total", bookingRepository.count());
        report.put("approved", bookingRepository.countByStatus("APPROVED"));
        report.put("pending", bookingRepository.countByStatus("PENDING"));
        report.put("rejected", bookingRepository.countByStatus("REJECTED"));

        return report;
    }
}
