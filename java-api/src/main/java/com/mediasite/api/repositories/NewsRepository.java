package com.mediasite.api.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.mediasite.api.model.News;

public interface NewsRepository extends MongoRepository<News, String> {
}
