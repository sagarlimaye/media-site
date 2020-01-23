package com.mediasite.api.controllers;

import org.springframework.web.bind.annotation.RestController;
import java.sql.Date;
import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.mediasite.api.exceptions.UserNotFoundException;
import com.mediasite.api.model.News;
import com.mediasite.api.model.User;
import com.mediasite.api.repositories.NewsRepository;
import com.mediasite.api.repositories.UserRepository;
import com.mediasite.api.security.MediaSitePasswordEncoder;

@RestController
public class ApiController {

    @Autowired NewsRepository newsRepository;

    @Autowired UserRepository userRepository;
    @Autowired MediaSitePasswordEncoder mSitePasswordEncoder;

    @GetMapping("/news")
    public List<News> getNews() {
        return newsRepository.findAll();
    }
    @GetMapping("/news/{id}")
    public Optional<News> getNewsById(@PathVariable("id") String id) {
        return newsRepository.findById(id);
    }
    @PostMapping("/news")
    public void createNews(@RequestBody News news) {
        newsRepository.save(news);
    }
    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        user.setPassword(mSitePasswordEncoder.encode(user.getPassword()));
        return userRepository.save(user).get_id();
    }
}