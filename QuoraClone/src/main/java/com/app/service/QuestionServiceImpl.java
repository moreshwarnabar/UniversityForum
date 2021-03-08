package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.customexception.CategoryNotFoundException;
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
	public List<Question> fetchQuestionForCategory(int categoryId) {
		Category c = catRepo.findById(categoryId)
						.orElseThrow(() -> new CategoryNotFoundException("No category found for id " + categoryId));
		return questionRepo.findByCategory(c);
	}

	@Override
	public List<Question> fetchQuestionsContaining(String description, int categoryId) {
		Category c = catRepo.findById(categoryId)
						.orElseThrow(() -> new CategoryNotFoundException("No category found for id " + categoryId));
		return questionRepo.findByDescriptionContainingAndCategory(description, c);
	}

	@Override
	public Question persistQuestion(Question question) {
		questionRepo.save(question);
		return question;
	}

}
