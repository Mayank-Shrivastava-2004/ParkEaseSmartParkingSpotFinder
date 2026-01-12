package com.example.parkease.repository;

import com.example.parkease.model.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BookingRepository extends MongoRepository<Booking, String> {

    List<Booking> findByProviderEmail(String providerEmail);
    List<Booking> findByDriverEmail(String driverEmail);

    long countByStatus(String status);
}
