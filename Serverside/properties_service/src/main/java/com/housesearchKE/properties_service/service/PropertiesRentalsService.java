package com.housesearchKE.properties_service.service;

import com.housesearchKE.properties_service.dto.PropertiesDTO;
import com.housesearchKE.properties_service.feign.PropertiesOwnersInterface;
import com.housesearchKE.properties_service.model.Property;
import com.housesearchKE.properties_service.model.PropertyOwner;
import com.housesearchKE.properties_service.repository.PropertiesRepository;
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

    public ResponseEntity<List<PropertiesDTO>> getAllRentals() {
        List<PropertiesDTO> properties = new ArrayList<>();

        List<Property> props = propertiesRepository.findAll();

        for(Property property: props) {
            PropertyOwner owner = propertiesOwnersInterface.getPropertyOwner(property.getPropertyOwnerId()).getBody().get();

            PropertiesDTO propertyDTO = new PropertiesDTO();
            propertyDTO.setRentalId(property.getRentalId());
            propertyDTO.setPropertyOwner(owner);
            propertyDTO.setTerm(property.getTerm());
            propertyDTO.setAmount(property.getAmount());
            propertyDTO.setTenantPreferences(property.getTenantPreferences());
            propertyDTO.setNumberOfOccupants(property.getNumberOfOccupants());
            propertyDTO.setType(property.getType());
            propertyDTO.setPhotographs(property.getPhotographs());
            propertyDTO.setLocation(property.getLocation());
            propertyDTO.setAmmenities(property.getAmmenities());

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
            propertyDTO.setTerm(prop.get().getTerm());
            propertyDTO.setAmount(prop.get().getAmount());
            propertyDTO.setTenantPreferences(prop.get().getTenantPreferences());
            propertyDTO.setNumberOfOccupants(prop.get().getNumberOfOccupants());
            propertyDTO.setType(prop.get().getType());
            propertyDTO.setPhotographs(prop.get().getPhotographs());
            propertyDTO.setLocation(prop.get().getLocation());
            propertyDTO.setAmmenities(prop.get().getAmmenities());

            return new ResponseEntity<>(propertyDTO, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.OK);
        }
    }

    public ResponseEntity<Property> saveRental(PropertiesDTO propertyDTO) {
        Property property = new Property();

        if(propertyDTO.getRentalId()!= null)
            property.setRentalId(propertyDTO.getRentalId());
        property.setPropertyOwnerId(propertyDTO.getPropertyOwner().getId());
        property.setTerm(propertyDTO.getTerm());
        property.setAmount(propertyDTO.getAmount());
        property.setTenantPreferences(propertyDTO.getTenantPreferences());
        if(propertyDTO.getNumberOfOccupants()!= null)
            property.setNumberOfOccupants(propertyDTO.getNumberOfOccupants());
        property.setType(propertyDTO.getType());
        property.setPhotographs(propertyDTO.getPhotographs());
        property.setLocation(propertyDTO.getLocation());
        property.setAmmenities(propertyDTO.getAmmenities());

        return new ResponseEntity<>(propertiesRepository.save(property), HttpStatus.CREATED);
    }

    public ResponseEntity<List<Property>> saveRentals(List<PropertiesDTO> propertiesDTOs) {
        List<Property> properties = new ArrayList<>();

        for(PropertiesDTO propertyDTO: propertiesDTOs) {
            Property property = new Property();

            if(propertyDTO.getRentalId()!= null)
                property.setRentalId(propertyDTO.getRentalId());
            property.setPropertyOwnerId(propertyDTO.getPropertyOwner().getId());
            property.setTerm(propertyDTO.getTerm());
            property.setAmount(propertyDTO.getAmount());
            property.setTenantPreferences(propertyDTO.getTenantPreferences());
            if(propertyDTO.getNumberOfOccupants()!= null)
                property.setNumberOfOccupants(propertyDTO.getNumberOfOccupants());
            property.setType(propertyDTO.getType());
            property.setPhotographs(propertyDTO.getPhotographs());
            property.setLocation(propertyDTO.getLocation());
            property.setAmmenities(propertyDTO.getAmmenities());

            properties.add(property);
        }

        return new ResponseEntity<>(propertiesRepository.saveAll(properties), HttpStatus.CREATED);
    }
}
