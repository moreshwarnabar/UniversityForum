package com.app.exceptionhandler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.app.customexception.ContactDetailsNotFoundException;
import com.app.customexception.UserAuthorizationException;
import com.app.customexception.UserNotFoundException;
import com.app.dto.ErrorResponse;

@ControllerAdvice
public class GlobalExceptionHandler {

	// exception handler methods : User
	@ExceptionHandler(UserAuthorizationException.class)
	public ResponseEntity<?> userExceptionHandler(UserAuthorizationException e) {
		return new ResponseEntity<>(new ErrorResponse("Unable to authorize user", e.getMessage()),
				HttpStatus.UNAUTHORIZED);
	}
	
	@ExceptionHandler(UserNotFoundException.class)
	public ResponseEntity<?> userExceptionHandler(UserNotFoundException e) {
		return new ResponseEntity<>(new ErrorResponse("User not found", e.getMessage()), HttpStatus.NOT_FOUND);
	}
	
	// exception handler methods : contact_Details
	@ExceptionHandler(ContactDetailsNotFoundException.class)
	public ResponseEntity<?> contactDetailsExceptionHandler(ContactDetailsNotFoundException e){
		return new ResponseEntity<>(new ErrorResponse("Contact details not found", e.getMessage()), HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(RuntimeException.class)
	public ResponseEntity<?> contactDetailsExceptionHandler(RuntimeException e){
		return new ResponseEntity<>(new ErrorResponse("Something went wrong", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
