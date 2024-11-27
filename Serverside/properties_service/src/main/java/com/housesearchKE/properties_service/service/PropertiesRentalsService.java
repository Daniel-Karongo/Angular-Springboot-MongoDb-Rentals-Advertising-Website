package com.housesearchKE.properties_service.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.housesearchKE.properties_service.dto.PropertiesDTO;
import com.housesearchKE.properties_service.feign.PropertiesOwnersInterface;
import com.housesearchKE.properties_service.model.Property;
import com.housesearchKE.properties_service.model.PropertyEntity;
import com.housesearchKE.properties_service.model.PropertyOwner;
import com.housesearchKE.properties_service.repository.PropertiesRepository;
import com.housesearchKE.properties_service.repository.SearchRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PropertiesRentalsService {
    @Autowired
    private PropertiesRepository propertiesRepository;

    @Autowired
    private PropertiesOwnersInterface propertiesOwnersInterface;

    @Autowired
    private SearchRepository searchRepository;

    public ResponseEntity<List<PropertiesDTO>> getAllRentals() {
        List<PropertiesDTO> properties = new ArrayList<>();

        List<PropertyEntity> props = propertiesRepository.findAll();

        for(PropertyEntity property: props) {
            PropertyOwner owner = propertiesOwnersInterface.getPropertyOwner(property.getPropertyOwnerId()).getBody().get();

            PropertiesDTO propertyDTO = new PropertiesDTO();
            propertyDTO.setRentalId(property.getRentalId());
            propertyDTO.setPropertyOwner(owner);
            propertyDTO.setPlotSummaryDescription(property.getPlotSummaryDescription());
            propertyDTO.setPlotDetailedDescription(property.getPlotDetailedDescription());
            propertyDTO.setPhotographs(property.getPhotographs());
            propertyDTO.setTerm(property.getTerm());
            propertyDTO.setAmount(property.getAmount());
            propertyDTO.setTenantPreferences(property.getTenantPreferences());
            propertyDTO.setNumberOfOccupants(property.getNumberOfOccupants());
            propertyDTO.setType(property.getType());
            propertyDTO.setLocation(property.getLocation());
            propertyDTO.setAmenities(property.getAmenities());
            propertyDTO.setRating(property.getRating());
            propertyDTO.setRules(property.getRules());

            properties.add(propertyDTO);
        }

        return new ResponseEntity<>(properties, HttpStatus.OK);
    }

    public ResponseEntity<PropertiesDTO> getRental(String id) {
        Optional<PropertiesDTO> property = null;

        Optional<PropertyEntity> prop = propertiesRepository.findById(id);

        if(prop.isPresent()) {
            String ownerId = prop.get().getPropertyOwnerId();

            PropertyOwner owner = propertiesOwnersInterface.getPropertyOwner(ownerId).getBody().get();

            PropertiesDTO propertyDTO = new PropertiesDTO();
            propertyDTO.setRentalId(id);
            propertyDTO.setPropertyOwner(owner);
            propertyDTO.setPlotSummaryDescription(prop.get().getPlotSummaryDescription());
            propertyDTO.setPlotDetailedDescription(prop.get().getPlotDetailedDescription());
            propertyDTO.setPhotographs(prop.get().getPhotographs());
            propertyDTO.setTerm(prop.get().getTerm());
            propertyDTO.setAmount(prop.get().getAmount());
            propertyDTO.setTenantPreferences(prop.get().getTenantPreferences());
            propertyDTO.setNumberOfOccupants(prop.get().getNumberOfOccupants());
            propertyDTO.setType(prop.get().getType());
            propertyDTO.setLocation(prop.get().getLocation());
            propertyDTO.setAmenities(prop.get().getAmenities());
            propertyDTO.setRating(prop.get().getRating());
            propertyDTO.setRules(prop.get().getRules());

            return new ResponseEntity<>(propertyDTO, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.OK);
        }
    }

    public ResponseEntity<PropertyEntity> saveRental(Property property, HttpServletRequest request) {
        PropertyEntity propertyEntity = new PropertyEntity();

        if(property.getRentalId()!= null)
            propertyEntity.setRentalId(property.getRentalId());
        propertyEntity.setPropertyOwnerId(property.getPropertyOwnerId());
        propertyEntity.setPlotDetailedDescription(property.getPlotDetailedDescription());
        propertyEntity.setPlotSummaryDescription(property.getPlotSummaryDescription());
        propertyEntity.setTerm(property.getTerm());
        propertyEntity.setAmount(property.getAmount());
        propertyEntity.setTenantPreferences(property.getTenantPreferences());
        if((Integer)property.getNumberOfOccupants() != null)
            propertyEntity.setNumberOfOccupants(property.getNumberOfOccupants());
        propertyEntity.setType(property.getType());
        if(property.getPhotographs() != null) {
            propertyEntity.setPhotographs(uploadPhotographs(property, request));
        } else {
            Optional<PropertyEntity> prop = Optional.of(new PropertyEntity());
            prop = propertiesRepository.findById(property.getRentalId());
            propertyEntity.setPhotographs(prop.get().getPhotographs());
        }
        propertyEntity.setLocation(property.getLocation());
        propertyEntity.setAmenities(property.getAmenities());
        if((Integer)property.getNumberOfOccupants() != null)
            propertyEntity.setRating(property.getRating());
        propertyEntity.setRules(property.getRules());

        return new ResponseEntity<>(propertiesRepository.save(propertyEntity), HttpStatus.CREATED);
    }

    public ResponseEntity<List<PropertyEntity>> saveRentals(List<Property> properties, HttpServletRequest request) {
        List<PropertyEntity> propertyEntities = new ArrayList<>();
        for(Property property: properties) {
            PropertyEntity propertyEntity = new PropertyEntity();

            if(property.getRentalId()!= null)
                propertyEntity.setRentalId(property.getRentalId());
            propertyEntity.setPropertyOwnerId(property.getPropertyOwnerId());
            propertyEntity.setPlotDetailedDescription(property.getPlotDetailedDescription());
            propertyEntity.setPlotSummaryDescription(property.getPlotSummaryDescription());
            propertyEntity.setTerm(property.getTerm());
            propertyEntity.setAmount(property.getAmount());
            propertyEntity.setTenantPreferences(property.getTenantPreferences());
            if((Integer)property.getNumberOfOccupants() != null)
                propertyEntity.setNumberOfOccupants(property.getNumberOfOccupants());
            propertyEntity.setType(property.getType());
            propertyEntity.setPhotographs(uploadPhotographs(property, request));
            propertyEntity.setLocation(property.getLocation());
            propertyEntity.setAmenities(property.getAmenities());
            if((Integer)property.getNumberOfOccupants() != null)
                propertyEntity.setRating(property.getRating());
            propertyEntity.setRules(property.getRules());

            propertyEntities.add(propertyEntity);
        }

        return new ResponseEntity<>(propertiesRepository.saveAll(propertyEntities), HttpStatus.CREATED);
    }

    public ResponseEntity<List<PropertiesDTO>> searchRentals(String text) {
        List<PropertiesDTO> propertiesDTOS = new ArrayList<>();

        List<PropertyEntity> properties = searchRepository.findByText(text);

        for(PropertyEntity property: properties) {
            PropertiesDTO propertyDTO = new PropertiesDTO();

            PropertyOwner owner = propertiesOwnersInterface.getPropertyOwner(property.getPropertyOwnerId()).getBody().get();

            propertyDTO.setRentalId(property.getRentalId());
            propertyDTO.setPropertyOwner(owner);
            propertyDTO.setPlotSummaryDescription(property.getPlotSummaryDescription());
            propertyDTO.setPlotDetailedDescription(property.getPlotDetailedDescription());

//            List<File> files = getFilesFromPaths(property.getPhotographs());
//            if (files != null && files.size() > 0) {
//                // Get the first file
//                File firstFile = files.get(0);
//                List<File> filestoReturn = new ArrayList<>();
//                filestoReturn.add(firstFile);
//                propertyDTO.setPhotographs(filestoReturn); // Assuming propertyDTO expects an array
//            } else {
//                // Handle the case where there are no files
//                System.out.println("No files available.");
//            }
            propertyDTO.setPhotographs(property.getPhotographs());
            propertyDTO.setTerm(property.getTerm());
            propertyDTO.setAmount(property.getAmount());
            propertyDTO.setTenantPreferences(property.getTenantPreferences());
            propertyDTO.setNumberOfOccupants(property.getNumberOfOccupants());
            propertyDTO.setType(property.getType());
            propertyDTO.setLocation(property.getLocation());
            propertyDTO.setAmenities(property.getAmenities());
            propertyDTO.setRating(property.getRating());
            propertyDTO.setRules(property.getRules());

            propertiesDTOS.add(propertyDTO);
        }

        return new ResponseEntity<>(propertiesDTOS, HttpStatus.OK);
    }

    public ResponseEntity<List<String>> searchRentalsForOwner(String id) {
        List<String> rentalIds = new ArrayList<>();

        List<PropertyEntity> properties = propertiesRepository.findByPropertyOwnerId(id);
        for(PropertyEntity property: properties) {
            rentalIds.add(property.getRentalId());
        }

        return new ResponseEntity<>(rentalIds, HttpStatus.OK);
    }

    public ResponseEntity<List<PropertiesDTO>> returnRentalsForOwner(List<String> rentalIds) {
        List<PropertiesDTO> rentals = new ArrayList<>();

        List<PropertyEntity> properties = new ArrayList<>();
        for(String rentalId: rentalIds) {
            properties.add(propertiesRepository.findById(rentalId).get());
        }
        for(PropertyEntity property: properties) {
            PropertiesDTO propertyDTO = new PropertiesDTO();

            PropertyOwner owner = propertiesOwnersInterface.getPropertyOwner(property.getPropertyOwnerId()).getBody().get();

            propertyDTO.setRentalId(property.getRentalId());
            propertyDTO.setPropertyOwner(owner);
            propertyDTO.setPlotSummaryDescription(property.getPlotSummaryDescription());
            propertyDTO.setPlotDetailedDescription(property.getPlotDetailedDescription());

//            List<File> files = getFilesFromPaths(property.getPhotographs());
//            if (files != null && files.size() > 0) {
//                // Get the first file
//                File firstFile = files.get(0);
//                List<File> filestoReturn = new ArrayList<>();
//                filestoReturn.add(firstFile);
//                propertyDTO.setPhotographs(filestoReturn); // Assuming propertyDTO expects an array
//            } else {
//                // Handle the case where there are no files
//                System.out.println("No files available.");
//            }
            propertyDTO.setPhotographs(property.getPhotographs());
            propertyDTO.setTerm(property.getTerm());
            propertyDTO.setAmount(property.getAmount());
            propertyDTO.setTenantPreferences(property.getTenantPreferences());
            propertyDTO.setNumberOfOccupants(property.getNumberOfOccupants());
            propertyDTO.setType(property.getType());
            propertyDTO.setLocation(property.getLocation());
            propertyDTO.setAmenities(property.getAmenities());
            propertyDTO.setRating(property.getRating());
            propertyDTO.setRules(property.getRules());

            rentals.add(propertyDTO);
        }

        return new ResponseEntity<>(rentals, HttpStatus.OK);
    }

    public ResponseEntity<String> deleteRental(String id) {
        if (propertiesRepository.existsById(id)) {
            propertiesRepository.deleteById(id);
            return new ResponseEntity<>("Rental Deleted", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Rental Not Found", HttpStatus.NOT_FOUND);
        }
    }

    public List<String> uploadPhotographs(Property property, HttpServletRequest request) {
        List<File> photos = property.getPhotographs(); // Assuming this gets the files from the property
        List<String> savedFilePaths = new ArrayList<>();

        // Configure the file upload directory
        String uploadDirectory = "D:\\Projects\\Web Development\\Projects\\HousesearchKE\\Userdata";
        File uploadDir = new File(uploadDirectory);
        System.out.println(uploadDirectory);
        // Ensure the directory exists
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

        try {
            for (File file : photos) {
                if (file != null) {
                    // Handle duplicate file names
                    File uploadedFile = new File(uploadDir, file.getName());
                    if (uploadedFile.exists()) {
                        String baseName = file.getName().substring(0, file.getName().lastIndexOf('.'));
                        String extension = file.getName().substring(file.getName().lastIndexOf('.'));
                        int count = 1;

                        // Increment count to find a unique file name
                        while (uploadedFile.exists()) {
                            String newFileName = baseName + "_" + count + extension;
                            uploadedFile = new File(uploadDir, newFileName);
                            count++;
                        }
                    }

                    // Copy the file to the destination directory
                    Files.copy(file.toPath(), uploadedFile.toPath(), StandardCopyOption.REPLACE_EXISTING);

                    // Add the absolute file path to the result list
                    savedFilePaths.add(uploadedFile.getAbsolutePath());
                }
            }
        } catch (Exception e) {
            // Log any errors during file upload
            System.out.println("Error uploading files: " + e.getMessage());
            e.printStackTrace();
        }

        return savedFilePaths;
    }

    public List<File> getFilesFromPaths(String[] savedFilePaths) {
        if (savedFilePaths == null || savedFilePaths.length == 0) {
            return new ArrayList<File>(); // Return an empty array if no paths are provided
        }

        // Create a list to hold the File objects
        List<File> files = new ArrayList<>();

        for (String path : savedFilePaths) {
            if (path != null && !path.isEmpty()) {
                File file = new File(path);
                if (file.exists()) {
                    files.add(file); // Add the file to the list if it exists
                } else {
                    System.out.println("File not found: " + path); // Log missing files
                }
            }
        }

        // Convert the list to an array and return it
        return files;
    }

    public Property prepareRentalForUpload(String rentalId, String plotSummaryDescription, String plotDetailedDescription, String propertyOwnerId, String term, String amountStr, String tenantPreferencesJson, String numberOfOccupantsStr, String type, String location, String amenitiesJson, String ratingStr, MultipartFile[] photographs, String rules) {
        // Deserialize tenantPreferences and amenities from JSON
        ObjectMapper objectMapper = new ObjectMapper();
        String[] tenantPreferences = null;
        String[] amenities = null;

        Integer amount = parseInteger(amountStr);
        Integer numberOfOccupants = parseInteger(numberOfOccupantsStr);
        Integer rating = parseInteger(ratingStr);

        try {
            if (tenantPreferencesJson != null) {
                tenantPreferences = objectMapper.readValue(tenantPreferencesJson, String[].class);
            }
            if (amenitiesJson != null) {
                amenities = objectMapper.readValue(amenitiesJson, String[].class);
            }
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        // Create Property object manually using form data
        Property property = new Property();
        property.setRentalId(rentalId);
        property.setPlotSummaryDescription(plotSummaryDescription);
        property.setPlotDetailedDescription(plotDetailedDescription);
        property.setPropertyOwnerId(propertyOwnerId);
        property.setTerm(term);
        property.setAmount(amount != null ? amount : 0);  // Default to 0 if amount is not provided
        property.setTenantPreferences(tenantPreferences != null ? tenantPreferences : new String[0]);  // Default to empty array if not provided
        property.setNumberOfOccupants(numberOfOccupants != null ? numberOfOccupants : 0);  // Default to 0 if not provided
        property.setType(type);
        property.setLocation(location);
        property.setAmenities(amenities != null ? amenities : new String[0]);  // Default to empty array if not provided
        property.setRating(rating != null ? rating : 0);  // Default to 0 if rating is not provided
        property.setRules(rules);

        if (photographs != null && photographs.length > 0) {
            System.out.println("Photos present: " + photographs.length);
            for (MultipartFile photo : photographs) {
                System.out.println("Photo file: " + photo.getOriginalFilename());
            }
        } else {
            System.out.println("No photos uploaded");
        }

        // Handle photographs (convert MultipartFile[] to File objects)
        if (photographs != null && photographs.length > 0) {
            System.out.println("Photos present");
            List<File> photographFiles = new ArrayList<>();
            for (MultipartFile multipartFile : photographs) {
                try {
                    // Create a temporary file
                    File tempFile = File.createTempFile("upload-", multipartFile.getOriginalFilename());
                    multipartFile.transferTo(tempFile); // Transfer the content
                    photographFiles.add(tempFile);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            property.setPhotographs(photographFiles);
        }

        return property;
    }

    private Integer parseInteger(String value) {
        if ("undefined".equals(value) || value == null || value.isBlank()) {
            return null; // or provide a default value, e.g., return 0;
        }
        try {
            return Integer.parseInt(value);
        } catch (NumberFormatException e) {
            return null; // or log the issue
        }
    }
}
