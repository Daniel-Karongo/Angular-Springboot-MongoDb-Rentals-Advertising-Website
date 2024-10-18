package com.housesearchKE.mongoDbJobListingsDemo.repository;

import com.housesearchKE.mongoDbJobListingsDemo.model.Post;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface SearchRepository {
    List<Post> findByText(String text);
}
