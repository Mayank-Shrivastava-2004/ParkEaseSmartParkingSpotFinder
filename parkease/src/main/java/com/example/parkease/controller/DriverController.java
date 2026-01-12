package com.example.parkease.controller;

import com.example.parkease.model.Booking;
import com.example.parkease.repository.BookingRepository;
import com.example.parkease.service.BookingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/driver")
public class DriverController {

    private final BookingService bookingService;
    private final BookingRepository bookingRepository;

    public DriverController(BookingService bookingService,
                            BookingRepository bookingRepository) {
        this.bookingService = bookingService;
        this.bookingRepository = bookingRepository;
    }

    @PostMapping("/book-slot")
    public Booking bookSlot(@RequestBody Booking booking) {
        return bookingService.createBooking(booking);
    }

    @GetMapping("/my-bookings")
    public List<Booking> myBookings(@RequestParam String driverEmail) {
        return bookingRepository.findByDriverEmail(driverEmail);
    }
}
