package com.app.customexception;
@SuppressWarnings("serial")
public class QuestionNotFoundException extends RuntimeException{
	public QuestionNotFoundException(String msg)
	{
		super(msg);
	}

}
