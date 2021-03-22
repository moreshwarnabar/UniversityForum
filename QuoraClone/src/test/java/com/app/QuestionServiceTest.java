package com.app;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.app.pojos.Category;
import com.app.pojos.Question;
import com.app.repository.CategoryRepository;
import com.app.repository.QuestionRepository;
import com.app.service.IQuestionService;
import com.app.service.QuestionServiceImpl;

@ExtendWith(MockitoExtension.class)
public class QuestionServiceTest {

	@Mock
	private QuestionRepository questionRepo;

	@Mock
	private CategoryRepository catRepo;

	@Test
	@DisplayName("should retrieve all questions of a category")
	public void shouldFetchAllQuestionsOfACategory() {
		IQuestionService questionService = new QuestionServiceImpl(questionRepo, catRepo);

		List<Question> questions = new ArrayList<>();
		Category category = new Category(1, "Computer Science", 1, true);
		questions.add(
				new Question("How does hibernate work internally?", true, LocalDate.parse("2021-03-06"), category));
		questions.add(
				new Question("What are the two forms of polymorphism?", true, LocalDate.parse("2021-03-21"), category));

		Mockito.when(catRepo.findById(1)).thenReturn(Optional.of(category));
		Mockito.when(questionRepo.findByCategoryOrderByAskedOnDesc(category)).thenReturn(questions);

		List<Question> actualList = questionService.fetchQuestionForCategory(1);
		Assertions.assertThat(actualList.size()).isEqualTo(questions.size());
	}

	@Test
	@DisplayName("should fetch all questions which contain the searched word/phrase/pattern in description")
	public void shouldFetchAllQuestionsContainingAString() {
		IQuestionService questionService = new QuestionServiceImpl(questionRepo, catRepo);

		List<Question> questions = new ArrayList<>();
		Category category = new Category(1, "Computer Science", 1, true);
		questions.add(
				new Question("How does hibernate work internally?", true, LocalDate.parse("2021-03-06"), category));

		Mockito.when(catRepo.findById(1)).thenReturn(Optional.of(category));
		Mockito.when(questionRepo.findByDescriptionContainingAndCategory("hibernate", category)).thenReturn(questions);

		List<Question> actualList = questionService.fetchQuestionsContaining("hibernate", 1);
		Assertions.assertThat(actualList.get(0).getDescription()).isEqualTo(questions.get(0).getDescription());
	}

	@Test
	@DisplayName("should save the question in database")
	public void shouldSaveQuestion() {
		IQuestionService questionService = new QuestionServiceImpl(questionRepo, catRepo);

		Category category = new Category(1, "Computer Science", 1, true);
		Question q = new Question("What is OOP?", true, LocalDate.parse("2021-03-06"), category);
		
		Mockito.when(questionRepo.save(q)).thenReturn(q);
		
		Question actualQuestion = questionService.persistQuestion(q);
		Mockito.when(questionRepo.findById(actualQuestion.getId())).thenReturn(Optional.of(q));
		Optional<Question> saved = questionRepo.findById(actualQuestion.getId());
		
		Assertions.assertThat(saved.get().getId()).isEqualTo(actualQuestion.getId());
		Assertions.assertThat(actualQuestion.getDescription()).isEqualTo(q.getDescription());
	}

}
