package com.app.dto;

import java.time.LocalDateTime;

public class ErrorResponse {

	private String errorMessage;
	private String errorDetails;
	private LocalDateTime timestamp;

	public ErrorResponse() {
		
	}

	public ErrorResponse(String errorMessage, String errorDetails) {
		this.errorMessage = errorMessage;
		this.errorDetails = errorDetails;
		this.timestamp = LocalDateTime.now();
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

	public String getErrorDetails() {
		return errorDetails;
	}

	public void setErrorDetails(String errorDetails) {
		this.errorDetails = errorDetails;
	}

	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}
	
}
