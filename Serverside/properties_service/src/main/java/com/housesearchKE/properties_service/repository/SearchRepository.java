package com.housesearchKE.properties_service.repository;

import com.housesearchKE.properties_service.model.Property;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface SearchRepository {
    List<Property> findByText(String text);
}
