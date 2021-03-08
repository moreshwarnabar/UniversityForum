package com.app.service;

import java.util.List;

import com.app.pojos.Question;

public interface IQuestionService {
	
	List<Question> fetchQuestionForCategory(int categoryId);
	
	List<Question> fetchQuestionsContaining(String description, int categoryId);
	
	Question persistQuestion(Question question);
	
}
