package com.app.exceptionhandler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.app.customexception.AnswerNotFoundException;
import com.app.customexception.CategoryExistsException;
import com.app.customexception.CategoryNotFoundException;
import com.app.customexception.ContactDetailsNotFoundException;
import com.app.customexception.FacultyHandlingException;
import com.app.customexception.QuestionNotFoundException;
import com.app.customexception.StudentNotFoundException;
import com.app.customexception.UserAuthorizationException;
import com.app.customexception.UserExistsException;
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
	
	@ExceptionHandler(UserExistsException.class)
	public ResponseEntity<?> userExceptionHandler(UserExistsException e) {
		return new ResponseEntity<>(new ErrorResponse("Username taken", e.getMessage()), HttpStatus.CONFLICT);
	}

	@ExceptionHandler(CategoryExistsException.class)
	public ResponseEntity<?> categoryExceptionHandler(CategoryExistsException e) {
		return new ResponseEntity<>(new ErrorResponse("Category exists", e.getMessage()), HttpStatus.CONFLICT);
	}

	@ExceptionHandler(CategoryNotFoundException.class)
	public ResponseEntity<?> categoryExceptionHandler(CategoryNotFoundException e) {
		return new ResponseEntity<>(new ErrorResponse("Category not found", e.getMessage()), HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(StudentNotFoundException.class)
	public ResponseEntity<?> studentExceptionHandler(StudentNotFoundException e) {
		return new ResponseEntity<>(new ErrorResponse("Student not found", e.getMessage()), HttpStatus.NOT_FOUND);
	}

	// exception handler methods : contact_Details
	@ExceptionHandler(ContactDetailsNotFoundException.class)
	public ResponseEntity<?> contactDetailsExceptionHandler(ContactDetailsNotFoundException e) {
		return new ResponseEntity<>(new ErrorResponse("Contact details not found", e.getMessage()),
				HttpStatus.NOT_FOUND);
	}

	// exception handler methods
	@ExceptionHandler(FacultyHandlingException.class)
	public ResponseEntity<?> facultyExceptionHandler(FacultyHandlingException e) {
		return new ResponseEntity<>(new ErrorResponse("Faculty fetching failed!", e.getMessage()),
				HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(AnswerNotFoundException.class)
	public ResponseEntity<?> answerExceptionHandler(AnswerNotFoundException e) {
		return new ResponseEntity<>(new ErrorResponse("Answer not found", e.getMessage()), HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(QuestionNotFoundException.class)
	public ResponseEntity<?> questionExceptionHandler(QuestionNotFoundException e) {
		return new ResponseEntity<>(new ErrorResponse("Question not found", e.getMessage()), HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(RuntimeException.class)
	public ResponseEntity<?> contactDetailsExceptionHandler(RuntimeException e) {
		return new ResponseEntity<>(new ErrorResponse("Something went wrong", e.getMessage()),
				HttpStatus.INTERNAL_SERVER_ERROR);
	}

}
