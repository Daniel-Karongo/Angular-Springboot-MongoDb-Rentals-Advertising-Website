package com.housesearchKE.properties_service.repository;

import com.housesearchKE.properties_service.model.PropertyEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PropertiesRepository extends MongoRepository<PropertyEntity, String> {
    List<PropertyEntity> findByPropertyOwnerId(String id);
}
