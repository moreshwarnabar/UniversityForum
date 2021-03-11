package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ResponseDTO;
import com.app.pojos.Answer;
import com.app.service.IAnswerService;

@RestController
@RequestMapping("/answers")
@CrossOrigin
public class AnswerController {

	@Autowired
	private IAnswerService answerService;

	@GetMapping("/{questionId}")
	public ResponseEntity<?> fetchAllFromQuestion(@PathVariable int questionId) {
		return ResponseEntity.ok(new ResponseDTO<>(answerService.fetchAnswerForQuestion(questionId)));
	}

	@PostMapping("/")
	public ResponseEntity<?> addAnswer(@RequestBody Answer ans) {
		return new ResponseEntity<>(new ResponseDTO<>(answerService.addAnswer(ans)), HttpStatus.CREATED);
	}

	@DeleteMapping("/{answerId}")
	public ResponseEntity<?> deleteAnswer(@PathVariable int answerId) {
		return ResponseEntity.ok(new ResponseDTO<>(answerService.deleteAnswer(answerId)));
	}

}