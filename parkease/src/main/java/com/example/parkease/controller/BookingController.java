package com.example.parkease.controller;

import com.example.parkease.model.Booking;
import com.example.parkease.repository.BookingRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class BookingController {

    private final BookingRepository bookingRepository;

    public BookingController(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @GetMapping("/book-slot")
    public String bookSlotPage() {
        return "book-slot";
    }

    @PostMapping("/book-slot")
    public String bookSlot(@RequestParam String email,
                       @RequestParam String location,
                       @RequestParam String slotNumber,
                       @RequestParam String providerEmail,
                       @RequestParam String date) {

    Booking booking = new Booking();
    booking.setDriverEmail(email);
    booking.setProviderEmail(providerEmail);
    booking.setLocation(location);
    booking.setSlotNumber(slotNumber);
    booking.setDate(date);
    booking.setStatus("PENDING");

    bookingRepository.save(booking);

    return "redirect:/driver-home";
   }

}
