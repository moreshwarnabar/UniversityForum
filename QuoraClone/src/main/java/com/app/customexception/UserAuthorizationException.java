package com.app.customexception;

@SuppressWarnings("serial")
public class UserAuthorizationException extends RuntimeException {

	public UserAuthorizationException(String message) {
		super(message);
	}
	
}
