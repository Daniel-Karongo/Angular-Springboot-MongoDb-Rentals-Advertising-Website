package com.housesearchKE.properties_service.model;

import com.mongodb.lang.Nullable;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.io.File;
import java.util.List;

@Data
public class Property {
    @Id
    private String rentalId;

    private String propertyOwnerId;
    private String plotSummaryDescription;
    private String plotDetailedDescription;
    private List<File> photographs;
    private String term;
    private int amount;
    private String[] tenantPreferences;
    @Nullable
    private int numberOfOccupants;
    private String type;
    private String location;
    private String[] amenities;
    private double rating;
    private String rules;
}
