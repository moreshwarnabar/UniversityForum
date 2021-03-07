package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.pojos.Question;
import com.app.service.IQuestionService;

@RestController
@RequestMapping("/questions")
public class QuestionController {
	
	@Autowired
	private IQuestionService questionService;
	
	@GetMapping("/all/{categoryId}")
	public List<Question> fetchAllFromCategory(@PathVariable int categoryId) {
		return questionService.fetchQuestionForCategory(categoryId);
	}
	
	@GetMapping("/filter/{description}/{categoryId}")
	public List<Question> fetchQuestionsContaining(@PathVariable String description, @PathVariable int categoryId) {
		return questionService.fetchQuestionsContaining(description, categoryId);
	}

	@PostMapping
	public Question saveQuestion(@RequestBody Question q) {
		return questionService.persistQuestion(q);
	}
	
}
