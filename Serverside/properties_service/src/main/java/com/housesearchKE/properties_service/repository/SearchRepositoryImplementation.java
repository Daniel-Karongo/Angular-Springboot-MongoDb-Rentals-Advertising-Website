package com.housesearchKE.mongoDbJobListingsDemo.repository;

import com.housesearchKE.mongoDbJobListingsDemo.model.Post;

import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;

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
    public List<Post> findByText(String text) {
        List<Post> posts = new ArrayList<>();

        MongoDatabase database = client.getDatabase("jobpostings");
        MongoCollection<Document> collection = database.getCollection("jobs");

        // Create a regex pattern for case-insensitive search
        String regexPattern = String.format(".*%s.*", text);

        AggregateIterable<Document> result = collection.aggregate(Arrays.asList(
                new Document("$match",
                        new Document("$or", Arrays.asList(
                                new Document("desc", new Document("$regex", regexPattern).append("$options", "i")),
                                new Document("profile", new Document("$regex", regexPattern).append("$options", "i")),
                                new Document("techs", new Document("$regex", regexPattern).append("$options", "i"))
                        ))),
                new Document("$sort", new Document("exp", -1L))     // To sort by experience in descending order
//                new Document("$skip", 2L),        // To skip the first two results
//                new Document("$limit", 3L)        // To Limit the results to only 3 documents
        ));

        result.forEach(doc -> posts.add(converter.read(Post.class, doc)));

        return posts;
    }

}