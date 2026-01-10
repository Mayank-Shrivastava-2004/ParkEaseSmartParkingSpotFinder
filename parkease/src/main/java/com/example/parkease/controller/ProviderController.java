package com.example.parkease.controller;

import com.example.parkease.model.ParkingSlot;
import com.example.parkease.repository.ParkingSlotRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class ProviderController {

    private final ParkingSlotRepository parkingSlotRepository;

    public ProviderController(ParkingSlotRepository parkingSlotRepository) {
        this.parkingSlotRepository = parkingSlotRepository;
    }

    @GetMapping("/add-slot")
    public String addSlotPage() {
        return "add-slot";
    }

    @PostMapping("/add-slot")
    public String addSlot(@RequestParam String providerEmail,
                          @RequestParam String location,
                          @RequestParam String slotNumber) {

        ParkingSlot slot = new ParkingSlot();
        slot.setProviderEmail(providerEmail);
        slot.setLocation(location);
        slot.setSlotNumber(slotNumber);
        slot.setAvailable(true);

        parkingSlotRepository.save(slot);

        return "redirect:/provider-home";
    }
}
