package com.example.parkease.controller;

import com.example.parkease.model.ParkingSlot;
import com.example.parkease.repository.ParkingSlotRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.stream.Collectors;

@Controller
public class ProviderParkingMapController {

    private final ParkingSlotRepository parkingSlotRepository;

    public ProviderParkingMapController(ParkingSlotRepository parkingSlotRepository) {
        this.parkingSlotRepository = parkingSlotRepository;
    }

    @GetMapping("/provider-parking-map")
    public String showProviderParking(Model model) {

        List<ParkingSlot> slots = parkingSlotRepository.findByAvailableTrue();

        // Collect only locations
        List<String> locations = slots.stream()
                .map(ParkingSlot::getLocation)
                .distinct()
                .collect(Collectors.toList());

        model.addAttribute("locations", locations);

        return "provider-parking-map";
    }
}
