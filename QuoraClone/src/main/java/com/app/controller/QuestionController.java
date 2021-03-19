package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ResponseDTO;
import com.app.pojos.Question;
import com.app.service.IQuestionService;

@RestController
@RequestMapping("/questions")
@CrossOrigin
public class QuestionController {
	
	@Autowired
	private IQuestionService questionService;
	
	@GetMapping("/all/{categoryId}")
	public ResponseEntity<?> fetchAllFromCategory(@PathVariable int categoryId) {
		return ResponseEntity.ok(new ResponseDTO<>(questionService.fetchQuestionForCategory(categoryId)));
	}
	
	@GetMapping("/filter/{description}/{categoryId}")
	public ResponseEntity<?> fetchQuestionsContaining(@PathVariable String description, @PathVariable int categoryId) {
		return ResponseEntity.ok(new ResponseDTO<>(questionService.fetchQuestionsContaining(description, categoryId)));
	}
	
	@GetMapping("/recentlyask/{categoryId}")
	public ResponseEntity<?> fetchRecentlyAskQuestion(@PathVariable int categoryId) {
		return ResponseEntity.ok(new ResponseDTO<>(questionService.FetchfindByAskedOnAfter(categoryId)));
	}

	@PostMapping
	public ResponseEntity<?> saveQuestion(@RequestBody Question q) {
		return new ResponseEntity<>(new ResponseDTO<>(questionService.persistQuestion(q)), HttpStatus.CREATED);
	}
	
}
