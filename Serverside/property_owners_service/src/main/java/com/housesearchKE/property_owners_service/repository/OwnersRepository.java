package com.housesearchKE.property_owners_service.repository;

import com.housesearchKE.property_owners_service.model.PropertyOwner;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OwnersRepository extends MongoRepository<PropertyOwner, String> {
}
