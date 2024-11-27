package com.housesearchKE.properties_service.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;
import java.util.Properties;

import com.housesearchKE.properties_service.dto.PropertiesDTO;
import com.housesearchKE.properties_service.model.Property;
import com.housesearchKE.properties_service.model.PropertyEntity;
import com.mongodb.client.MongoClient;
import org.bson.Document;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.AggregateIterable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.convert.MongoConverter;
import org.springframework.stereotype.Repository;

@Repository
public class SearchRepositoryImplementation implements SearchRepository {

    @Autowired
    private MongoClient client;

    @Autowired
    private MongoConverter converter;

    @Override
    public List<PropertyEntity> findByText(String text) {
        List<PropertyEntity> properties = new ArrayList<>();
        MongoDatabase database = client.getDatabase("housesearchke");
        MongoCollection<Document> collection = database.getCollection("properties");

        // Create a regex pattern for case-insensitive search
        String regexPattern = String.format(".*%s.*", text);
        List<Document> orConditions = new ArrayList<>();

        orConditions.add(new Document("type", new Document("$regex", regexPattern).append("$options", "i")));
        orConditions.add(new Document("location", new Document("$regex", regexPattern).append("$options", "i")));
        orConditions.add(new Document("amenities", new Document("$regex", regexPattern).append("$options", "i")));

        // Check if the text can be parsed into an integer to search in the 'amount' field
        try {
            int amount = Integer.parseInt(text);
            orConditions.add(new Document("amount", amount));
        } catch (NumberFormatException e) {
            // The text is not a valid number, so we skip adding 'amount' to the search criteria.
        }

        AggregateIterable<Document> result = collection.aggregate(Arrays.asList(
                new Document("$match", new Document("$or", orConditions)),
                new Document("$sort", new Document("rating", -1L))  // To sort by rating in descending order
        ));

        result.forEach(doc -> properties.add(converter.read(PropertyEntity.class, doc)));

        return properties;
    }




}