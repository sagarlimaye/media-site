package com.mediasite.api.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.mediasite.api.model.User;

public interface UserRepository extends MongoRepository<User, String> {
	public User findByUsername(String username);
	public boolean existsByUsername(String username);
}
