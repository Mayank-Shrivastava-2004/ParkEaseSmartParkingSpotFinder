package com.example.parkease.controller;

import com.example.parkease.repository.BookingRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminReportController {

    private final BookingRepository bookingRepository;

    public AdminReportController(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @GetMapping("/admin-reports")
    public String reports(Model model) {

        model.addAttribute("total", bookingRepository.count());
        model.addAttribute("approved", bookingRepository.countByStatus("APPROVED"));
        model.addAttribute("pending", bookingRepository.countByStatus("PENDING"));
        model.addAttribute("rejected", bookingRepository.countByStatus("REJECTED"));

        return "admin-reports";
    }
}
