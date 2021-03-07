package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.pojos.Answer;
import com.app.pojos.Question;
import com.app.repository.AnswerRepository;
import com.app.repository.QuestionRepository;

@Service
@Transactional
public class AnswerServiceImpl implements IAnswerService
{
	

	@Autowired
	private AnswerRepository ansRepo;
	
	@Autowired
	private QuestionRepository queRepo;
	@Override
	public List<Answer> fetchAnswerForQuestion(int qId) {
		Question q=queRepo.findById(qId)
				.orElseThrow(() -> new RuntimeException("question not found"));
		return ansRepo.findByQuestion(q);
	}
	@Override
	public Answer addAnswer(Answer ans) {
			return ansRepo.save(ans);
	}
	@Override
	public String deleteAnswer(int id) {
		ansRepo.deleteById(id);
		return "Answer is deleted "+id;
		
	
	}

}

