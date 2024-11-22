package com.housesearchKE.properties_service.model;

import com.mongodb.lang.Nullable;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.File;

@Document(collection = "properties")
@Data
public class PropertyEntity {
    @Id
    private String rentalId;

    private String propertyOwnerId;
    private String plotSummaryDescription;
    private String plotDetailedDescription;
    private String[] photographs;
    private String term;
    private int amount;
    private String[] tenantPreferences;
    @Nullable
    private int numberOfOccupants;
    private String type;
    private String location;
    private String[] ammenities;
    private double rating;
    private String rules;
}
