package com.example.parkease.controller;

import com.example.parkease.repository.BookingRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminController {

    private final BookingRepository bookingRepository;

    public AdminController(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @GetMapping("/admin-bookings")
    public String viewBookings(Model model) {
        model.addAttribute("bookings", bookingRepository.findAll());
        return "admin-bookings";
    }
}
