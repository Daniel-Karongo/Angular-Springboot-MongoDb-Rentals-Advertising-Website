package com.housesearchKE.properties_service.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.housesearchKE.properties_service.dto.PropertiesDTO;
import com.housesearchKE.properties_service.model.Property;
import com.housesearchKE.properties_service.model.PropertyEntity;
import com.housesearchKE.properties_service.service.PropertiesRentalsService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("properties")
//@CrossOrigin(origins = "*")
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
    public ResponseEntity<PropertyEntity> saveRental(
            @RequestParam(value = "rentalId", required = false) String rentalId,
            @RequestParam(value = "propertyOwnerId", required = false) String propertyOwnerId,
            @RequestParam(value = "plotSummaryDescription", required = false) String plotSummaryDescription,
            @RequestParam(value = "plotSummaryDescription", required = false) String plotDetailedDescription,
            @RequestParam(value = "term", required = false) String term,
            @RequestParam(value = "amount", required = false) String amountStr,
            @RequestParam(value = "tenantPreferences", required = false) String tenantPreferencesJson,
            @RequestParam(value = "numberOfOccupants", required = false) String numberOfOccupantsStr,
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "location", required = false) String location,
            @RequestParam(value = "amenities", required = false) String amenitiesJson,
            @RequestParam(value = "rating", required = false) String ratingStr,
            @RequestParam(value = "photographs", required = false) MultipartFile[] photographs, // Accept file array
            @RequestParam(value = "rules", required = false) String rules,
            HttpServletRequest request) {

        Property property = propertiesRentalsService.prepareRentalForUpload(rentalId, plotSummaryDescription, plotDetailedDescription, propertyOwnerId, term, amountStr, tenantPreferencesJson, numberOfOccupantsStr, type, location, amenitiesJson, ratingStr, photographs, rules);
        System.out.println(property);
        return propertiesRentalsService.saveRental(property, request);
    }



    @PostMapping("properties")
    public ResponseEntity<List<PropertyEntity>> saveRentals(@RequestBody List<Property> properties, HttpServletRequest request) {
        return propertiesRentalsService.saveRentals(properties, request);
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

    @DeleteMapping("property/{rentalId}")
    public ResponseEntity<String> deleteRental(@PathVariable("rentalId") String id) {
        return propertiesRentalsService.deleteRental(id);
    }
}