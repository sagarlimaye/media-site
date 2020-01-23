package com.mediasite.api.exceptions;

import org.springframework.web.bind.annotation.ResponseStatus;

import org.springframework.http.HttpStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "Could not find the given user")
public class UserNotFoundException extends RuntimeException {

}