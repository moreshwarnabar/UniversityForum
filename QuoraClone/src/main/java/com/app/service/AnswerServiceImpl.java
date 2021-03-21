package com.app.service;

import java.time.LocalDate;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.customexception.AnswerNotFoundException;
import com.app.customexception.QuestionNotFoundException;
import com.app.pojos.Answer;
import com.app.pojos.Question;
import com.app.repository.AnswerRepository;
import com.app.repository.QuestionRepository;

@Service
@Transactional
public class AnswerServiceImpl implements IAnswerService {

	@Autowired
	private AnswerRepository ansRepo;

	@Autowired
	private QuestionRepository queRepo;

	@Override
	public List<Answer> fetchAnswerForQuestion(int qId) {
		Question q = queRepo.findById(qId)
						.orElseThrow(() -> new QuestionNotFoundException("question not found"));
		List<Answer> ans = ansRepo.findByQuestion(q);
		if (ans.isEmpty()) {
			throw new AnswerNotFoundException("No one Answered for this question....Sorry!!!!");
		}
		return ans;
	}

	@Override
	public Answer addAnswer(Answer ans) {
		Question q = queRepo.findById(ans.getQuestion().getId())
						.orElseThrow(() -> new QuestionNotFoundException(
								"question not found " + ans.getQuestion().getId()));

		//ans.setVotes(0);
		//ans.setReported(false);		
		q.setAnswered(true);
		ans.setAnsweredOn(LocalDate.now());
		return ansRepo.save(ans);
	}

	@Override
	public String deleteAnswer(int id) {
		ansRepo.deleteById(id);
		return "Answer is deleted " + id;

	}

	@Override
	public List<Answer> fetchReportedAnswers() {
		return ansRepo.findByIsReported(true);
	}

	@Override
	public Answer removeReport(Answer answer) {
		Answer a = ansRepo.findById(answer.getId())
				.orElseThrow(() -> new AnswerNotFoundException("No one Answered for this question....Sorry!!!!"));
		
		if (a.getIsReported() != answer.getIsReported())
			a.setIsReported(answer.getIsReported());
		
		return ansRepo.save(a);
	}
	
	@Override
	public Answer addReport(Answer ans) {
		Answer a = ansRepo.findById(ans.getId())
				.orElseThrow(() -> new AnswerNotFoundException("No one Answered for this question....Sorry!!!!"));
	
			a.setIsReported(ans.getIsReported());
		
		return ansRepo.save(a);
	}

}
