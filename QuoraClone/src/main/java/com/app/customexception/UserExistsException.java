package com.app.customexception;

@SuppressWarnings("serial")
public class UserExistsException extends RuntimeException {

	public UserExistsException(String message) {
		super(message);
	}

}
