package com.example.parkease.controller;

import com.example.parkease.repository.BookingRepository;
import com.example.parkease.service.BookingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/provider")
public class ProviderController {

    private final BookingRepository bookingRepository;
    private final BookingService bookingService;

    public ProviderController(BookingRepository bookingRepository,
                              BookingService bookingService) {
        this.bookingRepository = bookingRepository;
        this.bookingService = bookingService;
    }

    @GetMapping("/bookings")
    public List<?> providerBookings(@RequestParam String providerEmail) {
        return bookingRepository.findByProviderEmail(providerEmail);
    }

    @PutMapping("/approve")
    public Map<String, String> approve(@RequestParam String bookingId) {
        bookingService.updateStatus(bookingId, "APPROVED");
        return Map.of("message", "Booking approved");
    }

    @PutMapping("/reject")
    public Map<String, String> reject(@RequestParam String bookingId) {
        bookingService.updateStatus(bookingId, "REJECTED");
        return Map.of("message", "Booking rejected");
    }
}
