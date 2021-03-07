package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.pojos.Answer;
import com.app.service.IAnswerService;


@RestController
@RequestMapping("/answers")
public class AnswerController {
	
	@Autowired
	private IAnswerService answerService;
	
	@GetMapping("/{questionId}")
	public List<Answer> fetchAllFromQuestion(@PathVariable int questionId) {
		return answerService.fetchAnswerForQuestion(questionId);
	}
	
	@PostMapping("/")
	public Answer addAnswer(@RequestBody Answer ans)
	{
		return answerService.addAnswer(ans);
	}
	
	@DeleteMapping("/{answerId}")
	public String deleteAnswer(@PathVariable int answerId)
	{
		return answerService.deleteAnswer(answerId);
	}

}
