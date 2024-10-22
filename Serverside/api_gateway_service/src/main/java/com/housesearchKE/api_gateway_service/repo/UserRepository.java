package com.housesearchKE.api_gateway_service.repo;

import com.housesearchKE.api_gateway_service.model.PropertyOwner;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<PropertyOwner, Long> {
    PropertyOwner findByEmailAddress(String username);
}

