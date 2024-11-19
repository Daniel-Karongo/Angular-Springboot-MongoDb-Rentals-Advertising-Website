package com.housesearchKE.properties_service.service;

import com.housesearchKE.properties_service.dto.PropertiesDTO;
import com.housesearchKE.properties_service.feign.PropertiesOwnersInterface;
import com.housesearchKE.properties_service.model.Property;
import com.housesearchKE.properties_service.model.PropertyOwner;
import com.housesearchKE.properties_service.repository.PropertiesRepository;
import com.housesearchKE.properties_service.repository.SearchRepository;
import com.netflix.discovery.converters.Auto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PropertiesRentalsService {
    @Autowired
    private PropertiesRepository propertiesRepository;

    @Autowired
    private PropertiesOwnersInterface propertiesOwnersInterface;

    @Autowired
    private SearchRepository searchRepository;

    public ResponseEntity<List<PropertiesDTO>> getAllRentals() {
        List<PropertiesDTO> properties = new ArrayList<>();

        List<Property> props = propertiesRepository.findAll();

        for(Property property: props) {
            PropertyOwner owner = propertiesOwnersInterface.getPropertyOwner(property.getPropertyOwnerId()).getBody().get();

            PropertiesDTO propertyDTO = new PropertiesDTO();
            propertyDTO.setRentalId(property.getRentalId());
            propertyDTO.setPropertyOwner(owner);
            propertyDTO.setPlotSummaryDescription(property.getPlotSummaryDescription());
            propertyDTO.setPlotDetailedDescription(property.getPlotDetailedDescription());
            propertyDTO.setPhotoUrls(property.getPhotoUrls());
            propertyDTO.setTerm(property.getTerm());
            propertyDTO.setAmount(property.getAmount());
            propertyDTO.setTenantPreferences(property.getTenantPreferences());
            propertyDTO.setNumberOfOccupants(property.getNumberOfOccupants());
            propertyDTO.setType(property.getType());
            propertyDTO.setLocation(property.getLocation());
            propertyDTO.setAmmenities(property.getAmmenities());
            propertyDTO.setRating(property.getRating());

            properties.add(propertyDTO);
        }

        return new ResponseEntity<>(properties, HttpStatus.OK);
    }

    public ResponseEntity<PropertiesDTO> getRental(String id) {
        Optional<PropertiesDTO> property = null;

        Optional<Property> prop = propertiesRepository.findById(id);

        if(prop.isPresent()) {
            String ownerId = prop.get().getPropertyOwnerId();

            PropertyOwner owner = propertiesOwnersInterface.getPropertyOwner(ownerId).getBody().get();

            PropertiesDTO propertyDTO = new PropertiesDTO();
            propertyDTO.setRentalId(id);
            propertyDTO.setPropertyOwner(owner);
            propertyDTO.setPlotSummaryDescription(prop.get().getPlotSummaryDescription());
            propertyDTO.setPlotDetailedDescription(prop.get().getPlotDetailedDescription());
            propertyDTO.setPhotoUrls(prop.get().getPhotoUrls());
            propertyDTO.setTerm(prop.get().getTerm());
            propertyDTO.setAmount(prop.get().getAmount());
            propertyDTO.setTenantPreferences(prop.get().getTenantPreferences());
            propertyDTO.setNumberOfOccupants(prop.get().getNumberOfOccupants());
            propertyDTO.setType(prop.get().getType());
            propertyDTO.setLocation(prop.get().getLocation());
            propertyDTO.setAmmenities(prop.get().getAmmenities());
            propertyDTO.setRating(prop.get().getRating());

            return new ResponseEntity<>(propertyDTO, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.OK);
        }
    }

    public ResponseEntity<Property> saveRental(Property property) {
//        if(property.getRentalId()!= null)
//            property.setRentalId(propertyDTO.getRentalId());
//        property.setPropertyOwnerId(propertyDTO.getPropertyOwner().getId());
//        property.setTerm(propertyDTO.getTerm());
//        property.setAmount(propertyDTO.getAmount());
//        property.setTenantPreferences(propertyDTO.getTenantPreferences());
//        if(propertyDTO.getNumberOfOccupants()!= null)
//            property.setNumberOfOccupants(propertyDTO.getNumberOfOccupants());
//        property.setType(propertyDTO.getType());
//        property.setPhotographs(propertyDTO.getPhotographs());
//        property.setLocation(propertyDTO.getLocation());
//        property.setAmmenities(propertyDTO.getAmmenities());
//        property.setRating(propertyDTO.getRating());

        return new ResponseEntity<>(propertiesRepository.save(property), HttpStatus.CREATED);
    }

    public ResponseEntity<List<Property>> saveRentals(List<Property> properties) {
//        for(PropertiesDTO propertyDTO: propertiesDTOs) {
//            Property property = new Property();
//
//            if(propertyDTO.getRentalId()!= null)
//                property.setRentalId(propertyDTO.getRentalId());
//            property.setPropertyOwnerId(propertyDTO.getPropertyOwner().getId());
//            property.setTerm(propertyDTO.getTerm());
//            property.setAmount(propertyDTO.getAmount());
//            property.setTenantPreferences(propertyDTO.getTenantPreferences());
//            if(propertyDTO.getNumberOfOccupants()!= null)
//                property.setNumberOfOccupants(propertyDTO.getNumberOfOccupants());
//            property.setType(propertyDTO.getType());
//            property.setPhotographs(propertyDTO.getPhotographs());
//            property.setLocation(propertyDTO.getLocation());
//            property.setAmmenities(propertyDTO.getAmmenities());
//            property.setRating(propertyDTO.getRating());
//
//            properties.add(property);
//        }

        return new ResponseEntity<>(propertiesRepository.saveAll(properties), HttpStatus.CREATED);
    }

    public ResponseEntity<List<PropertiesDTO>> searchRentals(String text) {
        List<PropertiesDTO> propertiesDTOS = new ArrayList<>();

        List<Property> properties = searchRepository.findByText(text);

        for(Property property: properties) {
            PropertiesDTO propertyDTO = new PropertiesDTO();

            PropertyOwner owner = propertiesOwnersInterface.getPropertyOwner(property.getPropertyOwnerId()).getBody().get();

            propertyDTO.setRentalId(property.getRentalId());
            propertyDTO.setPropertyOwner(owner);
            propertyDTO.setPlotSummaryDescription(property.getPlotSummaryDescription());
            propertyDTO.setPlotDetailedDescription(property.getPlotDetailedDescription());
            propertyDTO.setPhotoUrls(property.getPhotoUrls());
            propertyDTO.setTerm(property.getTerm());
            propertyDTO.setAmount(property.getAmount());
            propertyDTO.setTenantPreferences(property.getTenantPreferences());
            propertyDTO.setNumberOfOccupants(property.getNumberOfOccupants());
            propertyDTO.setType(property.getType());
            propertyDTO.setLocation(property.getLocation());
            propertyDTO.setAmmenities(property.getAmmenities());
            propertyDTO.setRating(property.getRating());

            propertiesDTOS.add(propertyDTO);
        }

        return new ResponseEntity<>(propertiesDTOS, HttpStatus.OK);
    }

    public ResponseEntity<List<String>> searchRentalsForOwner(String id) {
        List<String> rentalIds = new ArrayList<>();

        List<Property> properties = propertiesRepository.findByPropertyOwnerId(id);
        for(Property property: properties) {
            rentalIds.add(property.getRentalId());
        }

        return new ResponseEntity<>(rentalIds, HttpStatus.OK);
    }

    public ResponseEntity<List<PropertiesDTO>> returnRentalsForOwner(List<String> rentalIds) {
        List<PropertiesDTO> rentals = new ArrayList<>();

        List<Property> properties = new ArrayList<>();
        for(String rentalId: rentalIds) {
            properties.add(propertiesRepository.findById(rentalId).get());
        }
        for(Property property: properties) {
            PropertiesDTO propertyDTO = new PropertiesDTO();

            PropertyOwner owner = propertiesOwnersInterface.getPropertyOwner(property.getPropertyOwnerId()).getBody().get();

            propertyDTO.setRentalId(property.getRentalId());
            propertyDTO.setPropertyOwner(owner);
            propertyDTO.setPlotSummaryDescription(property.getPlotSummaryDescription());
            propertyDTO.setPlotDetailedDescription(property.getPlotDetailedDescription());
            propertyDTO.setPhotoUrls(property.getPhotoUrls());
            propertyDTO.setTerm(property.getTerm());
            propertyDTO.setAmount(property.getAmount());
            propertyDTO.setTenantPreferences(property.getTenantPreferences());
            propertyDTO.setNumberOfOccupants(property.getNumberOfOccupants());
            propertyDTO.setType(property.getType());
            propertyDTO.setLocation(property.getLocation());
            propertyDTO.setAmmenities(property.getAmmenities());
            propertyDTO.setRating(property.getRating());

            rentals.add(propertyDTO);
        }

        return new ResponseEntity<>(rentals, HttpStatus.OK);
    }
}
