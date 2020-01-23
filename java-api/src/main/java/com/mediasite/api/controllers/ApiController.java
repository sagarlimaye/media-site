package com.mediasite.api.controllers;

import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mediasite.api.model.News;
import com.mediasite.api.model.User;
import com.mediasite.api.repositories.NewsRepository;
import com.mediasite.api.repositories.UserRepository;
import com.mediasite.api.security.MediaSitePasswordEncoder;

@RestController
public class ApiController {

    @Autowired
    NewsRepository newsRepository;

    @Autowired
    UserRepository userRepository;
    @Autowired
    MediaSitePasswordEncoder mSitePasswordEncoder;

    @GetMapping("/news")
    public List<News> getNews() {
        return newsRepository.findAll();
    }

    @GetMapping("/news/{id}")
    public Optional<News> getNewsById(@PathVariable("id") String id) {
        return newsRepository.findById(id);
    }

    // ADD NEWS RETURNS ERROR BECAUSE OF DATE PARSING 
    @PostMapping("/addnews")
    public void createNews(@RequestBody News news) {
        newsRepository.save(news);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/register")
    public String registerUser(@RequestBody User user) throws JsonProcessingException {
        user.setPassword(mSitePasswordEncoder.encode(user.getPassword()));
        return new ObjectMapper().writeValueAsString(userRepository.save(user).get_id());
    }
    @GetMapping("/users")
    public List<User> getUsers() {
        return userRepository.findAll();
    }
    @GetMapping("/user/{id}")
    public Optional<User> getUserById(@PathVariable("id") String id) {
        return userRepository.findById(id);
    }
    @PutMapping("/user/{id}")
    public ResponseEntity<User> updateUserById(@PathVariable("id") String id, @RequestBody User user) {
        Optional<User> u = userRepository.findById(id);
        if(u.isPresent()) { 
            userRepository.save(user);
            return new ResponseEntity<User>(user, HttpStatus.OK);
        }
        else {
            user.set_id(null);
            userRepository.save(user);
            return new ResponseEntity<User>(user, HttpStatus.CREATED);
        }
    }
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/user/{id}")
    public void deleteUserById(@PathVariable("id") String id) {
        userRepository.deleteById(id);
    }
    @DeleteMapping("/news/{id}")
    public void deleteNewsById(@PathVariable("id") String id) {
        newsRepository.deleteById(id);
    }
}