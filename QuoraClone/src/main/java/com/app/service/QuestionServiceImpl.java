package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.pojos.Category;
import com.app.pojos.Question;
import com.app.repository.CategoryRepository;
import com.app.repository.QuestionRepository;

@Service
@Transactional
public class QuestionServiceImpl implements IQuestionService {
	
	@Autowired
	private QuestionRepository questionRepo;
	
	@Autowired
	private CategoryRepository catRepo;

	@Override
	public List<Question> fetchQuestionForCategory(int cId) {
		Category c = catRepo.findById(cId)
						.orElseThrow(() -> new RuntimeException("category not found"));
		return questionRepo.findByCategory(c);
	}

	@Override
	public List<Question> fetchQuestionsContaining(String description, int cId) {
		Category c = catRepo.findById(cId)
						.orElseThrow(() -> new RuntimeException("category not found"));
		return questionRepo.findByDescriptionContainingAndCategory(description, c);
	}

	@Override
	public Question persistQuestion(Question q) {
		questionRepo.save(q);
		return q;
	}

}
