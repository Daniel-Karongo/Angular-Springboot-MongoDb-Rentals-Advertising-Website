package com.housesearchKE.properties_service.dto;

import com.housesearchKE.properties_service.model.PropertyOwner;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.List;

@Component
@Data
@NoArgsConstructor
public class PropertiesDTO {
    private String rentalId;
    private PropertyOwner propertyOwner;
    private String plotSummaryDescription;
    private String plotDetailedDescription;
    private List<String> photographs;
    private String term;
    private Integer amount;
    private String[] tenantPreferences;
    private Integer numberOfOccupants;
    private String type;
    private String location;
    private String[] amenities;
    private double rating;
    private String rules;
}
