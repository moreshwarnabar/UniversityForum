package com.app.customexception;

@SuppressWarnings("serial")
public class CategoryNotFoundException extends RuntimeException {

	public CategoryNotFoundException(String message) {
		super(message);
	}

}
