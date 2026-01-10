package com.example.parkease.repository;

import com.example.parkease.model.ParkingSlot;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ParkingSlotRepository extends MongoRepository<ParkingSlot, String> {

    List<ParkingSlot> findByAvailableTrue();
}
