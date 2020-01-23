package com.mediasite.api;

import com.mediasite.api.security.MediaSitePasswordEncoder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiApplication.class, args);
	}
	@Bean
    public MediaSitePasswordEncoder mediaSitePasswordEncoder() {
        return new MediaSitePasswordEncoder();
    }
}