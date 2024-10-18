package com.housesearchKE.property_owners_service.service;

import com.housesearchKE.property_owners_service.model.PropertyOwner;
import com.housesearchKE.property_owners_service.repository.OwnersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OwnersService {
    @Autowired
    private OwnersRepository ownersRepository;

    public ResponseEntity<List<PropertyOwner>> getAllPropertyOwners() {
        return new ResponseEntity<>(ownersRepository.findAll(), HttpStatus.OK);

    }
    public ResponseEntity<Optional<PropertyOwner>> getPropertyOwner(String id) {
        return new ResponseEntity<>(ownersRepository.findById(id), HttpStatus.OK);
    }
    public ResponseEntity<PropertyOwner> savePropertyOwner(PropertyOwner owner) {
        return new ResponseEntity<>(ownersRepository.save(owner), HttpStatus.CREATED);
    }
    public ResponseEntity<List<PropertyOwner>> savePropertyOwners(List<PropertyOwner> owners) {
        return new ResponseEntity<>(ownersRepository.saveAll(owners), HttpStatus.CREATED);
    }
}
