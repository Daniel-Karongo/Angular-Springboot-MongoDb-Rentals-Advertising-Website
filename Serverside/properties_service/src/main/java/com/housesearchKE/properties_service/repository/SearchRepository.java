package com.housesearchKE.properties_service.repository;

import com.housesearchKE.properties_service.model.Property;
import com.housesearchKE.properties_service.model.PropertyEntity;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface SearchRepository {
    List<PropertyEntity> findByText(String text);
}
