package com.housesearchKE.properties_service.controller;

import com.housesearchKE.properties_service.dto.PropertiesDTO;
import com.housesearchKE.properties_service.model.Property;
import com.housesearchKE.properties_service.service.PropertiesRentalsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("properties")
public class PropertiesController {
    @Autowired
    private PropertiesRentalsService propertiesRentalsService;

    @GetMapping("")
    public ResponseEntity<List<PropertiesDTO>> getAllRentals() {
        return propertiesRentalsService.getAllRentals();
    }

    @GetMapping("property/{rentalId}")
    public ResponseEntity<PropertiesDTO> getRental(@PathVariable("rentalId") String id) {
        return propertiesRentalsService.getRental(id);
    }

    @PostMapping("property")
    public ResponseEntity<Property> saveRental(@RequestBody Property property) {
        return propertiesRentalsService.saveRental(property);
    }

    @PostMapping("properties")
    public ResponseEntity<List<Property>> saveRentals(@RequestBody List<Property> properties) {
        return propertiesRentalsService.saveRentals(properties);
    }

    @GetMapping("properties/{text}")
    public ResponseEntity<List<PropertiesDTO>> searchRentals(@PathVariable("text") String text) {
        return propertiesRentalsService.searchRentals(text);
    }

    @GetMapping("owner/{id}")
    public ResponseEntity<List<String>> searchRentalsForOwner(@PathVariable("id") String id) {
        return propertiesRentalsService.searchRentalsForOwner(id);
    }

    @PostMapping("owner")
    public ResponseEntity<List<PropertiesDTO>> returnRentalsForOwner(@RequestBody List<String> rentalIds) {
        return propertiesRentalsService.returnRentalsForOwner(rentalIds);
    }
}