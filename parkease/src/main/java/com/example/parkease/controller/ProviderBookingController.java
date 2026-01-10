package com.example.parkease.controller;

import com.example.parkease.repository.BookingRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class ProviderBookingController {

    private final BookingRepository bookingRepository;

    public ProviderBookingController(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @GetMapping("/provider-bookings")
    public String providerBookings(@RequestParam String providerEmail, Model model) {

        model.addAttribute("bookings",
                bookingRepository.findByProviderEmail(providerEmail));

        return "provider-bookings";
    }

    @PostMapping("/approve-booking")
    public String approveBooking(@RequestParam String bookingId,
                                 @RequestParam String providerEmail) {

        bookingRepository.findById(bookingId).ifPresent(b -> {
            b.setStatus("APPROVED");
            bookingRepository.save(b);
        });

        return "redirect:/provider-bookings?providerEmail=" + providerEmail;
    }

    @PostMapping("/reject-booking")
    public String rejectBooking(@RequestParam String bookingId,
                                @RequestParam String providerEmail) {

        bookingRepository.findById(bookingId).ifPresent(b -> {
            b.setStatus("REJECTED");
            bookingRepository.save(b);
        });

        return "redirect:/provider-bookings?providerEmail=" + providerEmail;
    }
}
