package com.app.customexception;

@SuppressWarnings("serial")
public class AnswerNotFoundException extends RuntimeException {

	public AnswerNotFoundException(String msg)
	{
		super(msg);
	}
}
