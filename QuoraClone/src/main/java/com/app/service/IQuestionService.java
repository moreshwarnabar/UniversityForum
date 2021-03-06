package com.app.service;

import java.util.List;

import com.app.pojos.Question;

public interface IQuestionService {
	
	List<Question> fetchQuestionForCategory(int cId);
	
	List<Question> fetchQuestionsContaining(String description, int cId);
	
	Question persistQuestion(Question q);
	
}
