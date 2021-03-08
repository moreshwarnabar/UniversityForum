package com.app.customexception;
@SuppressWarnings("serial")
public class StudentNotFoundException extends RuntimeException
{
	public StudentNotFoundException(String msg)
	{
		super(msg);
	}

}
