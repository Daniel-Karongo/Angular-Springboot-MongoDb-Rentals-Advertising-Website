package com.housesearchKE.property_owners_service.dto;

import com.housesearchKE.property_owners_service.model.PropertyOwner;
import lombok.Data;
import lombok.NoArgsConstructor;
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
    private List<File> photographs;
    private String term;
    private Integer amount;
    private String[] tenantPreferences;
    private Integer numberOfOccupants;
    private String type;
    private String location;
    private String[] ammenities;
    private double rating;
    private String rules;
}
