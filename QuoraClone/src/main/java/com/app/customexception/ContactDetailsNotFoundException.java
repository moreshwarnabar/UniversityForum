package com.app.customexception;

@SuppressWarnings("serial")
public class ContactDetailsNotFoundException extends RuntimeException {

	public ContactDetailsNotFoundException(String message) {
		super(message);
	}
}
