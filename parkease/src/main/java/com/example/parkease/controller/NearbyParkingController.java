package com.example.parkease.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class NearbyParkingController {

    @GetMapping("/nearby-parking")
    public String nearbyParking(@RequestParam(required = false) String location,
                                Model model) {

        model.addAttribute("location", location);
        return "nearby-parking";
    }
}
