package com.housesearchKE.properties_service.repository;

import com.housesearchKE.properties_service.model.Property;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface PropertiesRepository extends MongoRepository<Property, String> {
    List<Property> findByPropertyOwnerId(String id);
}
