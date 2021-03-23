package com.app.service;

import java.time.LocalDate;
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

	public QuestionServiceImpl(QuestionRepository questionRepo, CategoryRepository catRepo) {
		this.questionRepo = questionRepo;
		this.catRepo = catRepo;
	}

	@Override
	public List<Question> fetchQuestionForCategory(int categoryId) {
		Category c = catRepo.findById(categoryId)
						.orElseThrow(() -> new CategoryNotFoundException("No category found for id " + categoryId));

		return questionRepo.findByCategoryOrderByAskedOnDesc(c);
	}

	@Override
	public List<Question> fetchQuestionsContaining(String description, int categoryId) {
		Category c = catRepo.findById(categoryId)
						.orElseThrow(() -> new CategoryNotFoundException("No category found for id " + categoryId));
		return questionRepo.findByDescriptionContainingAndCategory(description, c);
	}

	@Override
	public Question persistQuestion(Question question) {
		question.setAskedOn(LocalDate.now());	//date of asking question
		//question.setAnswered(false);			//while 1st asking que isAnswered will false 
		questionRepo.save(question);
		return question;
	}
	
	@Override
	public List<Question> FetchfindByAskedOnAfter(int categoryId) {
		Category c = catRepo.findById(categoryId)
				.orElseThrow(() -> new CategoryNotFoundException("No category found for id " + categoryId));
		LocalDate date=LocalDate.now().minusDays(10);
		return questionRepo.findByAskedOnAfterAndCategory(date,c);
		
	}

}
