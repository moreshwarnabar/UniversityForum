package com.app.exceptionhandler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.app.customexception.CategoryNotFoundException;
import com.app.customexception.UserAuthorizationException;
import com.app.customexception.UserNotFoundException;
import com.app.dto.ErrorResponse;

@ControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(UserAuthorizationException.class)
	public ResponseEntity<?> userExceptionHandler(UserAuthorizationException e) {
		return new ResponseEntity<>(new ErrorResponse("Unable to authorize user", e.getMessage()),
				HttpStatus.UNAUTHORIZED);
	}
	
	@ExceptionHandler(UserNotFoundException.class)
	public ResponseEntity<?> userExceptionHandler(UserNotFoundException e) {
		return new ResponseEntity<>(new ErrorResponse("User not found", e.getMessage()), HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(CategoryNotFoundException.class)
	public ResponseEntity<?> categoryExceptionHandler(CategoryNotFoundException e) {
		return new ResponseEntity<>(new ErrorResponse("Category not found", e.getMessage()), HttpStatus.NOT_FOUND);
	}

}
