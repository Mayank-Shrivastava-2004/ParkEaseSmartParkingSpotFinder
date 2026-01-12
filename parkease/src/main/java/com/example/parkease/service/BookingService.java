package com.example.parkease.service;

import com.example.parkease.model.Booking;
import com.example.parkease.repository.BookingRepository;
import org.springframework.stereotype.Service;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public Booking createBooking(Booking booking) {
        booking.setStatus("PENDING");
        return bookingRepository.save(booking);
    }

    public void updateStatus(String bookingId, String status) {
        bookingRepository.findById(bookingId).ifPresent(b -> {
            b.setStatus(status);
            bookingRepository.save(b);
        });
    }
}
