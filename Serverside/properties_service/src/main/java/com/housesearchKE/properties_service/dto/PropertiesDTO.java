package com.housesearchKE.properties_service.dto;

import com.housesearchKE.properties_service.model.PropertyOwner;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.stereotype.Component;

@Component
@Data
@NoArgsConstructor
public class PropertiesDTO {
    private String rentalId;
    private PropertyOwner propertyOwner;
    private String term;
    private Integer amount;
    private String[] tenantPreferences;
    private Integer numberOfOccupants;
    private String type;
    private String[] photographs;
    private String location;
    private String[] ammenities;
}
