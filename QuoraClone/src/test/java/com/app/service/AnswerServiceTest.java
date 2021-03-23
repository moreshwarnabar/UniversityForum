package com.app.service;

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

import com.app.pojos.Answer;
import com.app.pojos.Category;
import com.app.pojos.Question;
import com.app.repository.AnswerRepository;
import com.app.repository.QuestionRepository;

@ExtendWith(MockitoExtension.class)
public class AnswerServiceTest {

	@Mock
	private QuestionRepository queRepo;

	@Mock
	private AnswerRepository ansRepo;

	@Test
	@DisplayName("should retrieve all answers for a question")
	public void shouldFetchAnswerForQuestion() {
		IAnswerService ansService = new AnswerServiceImpl(ansRepo, queRepo);

		List<Answer> answers = new ArrayList<>();
		Category category = new Category(1, "Computer Science", 1, true);
		Question q = new Question("How does hibernate work internally?", true, LocalDate.parse("2021-03-06"), category);
		answers.add(new Answer(q, "Hibernate uses sessions to save entities", LocalDate.parse("2020-03-08"), true));
		answers.add(new Answer(q, "Hibernate does dirty checking at the end of transactions",
				LocalDate.parse("2020-03-08"), true));
		answers.add(new Answer(q, "Hibernate is an ORM tool", LocalDate.parse("2020-03-08"), true));
		
		Mockito.when(queRepo.findById(1)).thenReturn(Optional.of(q));
		Mockito.when(ansRepo.findByQuestionOrderByAnsweredOnDesc(q)).thenReturn(answers);
		
		List<Answer> actualAnswers = ansService.fetchAnswerForQuestion(1);
		Assertions.assertThat(actualAnswers.size()).isEqualTo(answers.size());
		Assertions.assertThat(actualAnswers.get(0).getAnswer()).isEqualTo(answers.get(0).getAnswer());
	}
	
	@Test
	@DisplayName("should save the answer into database")
	public void shouldAddAnswer() {
		IAnswerService ansService = new AnswerServiceImpl(ansRepo, queRepo);
		
		Category category = new Category(1, "Computer Science", 1, true);
		Question q = new Question("How does hibernate work internally?", true, LocalDate.parse("2021-03-06"), category);
		q.setId(1);
		Answer ans = new Answer(q, "Hibernate is a JPA implementor", LocalDate.now(), false);
		
		Mockito.when(queRepo.findById(ans.getQuestion().getId())).thenReturn(Optional.of(q));
		Mockito.when(ansRepo.save(ans)).thenReturn(ans);
		
		Answer actualAnswer = ansService.addAnswer(ans);
		Mockito.when(ansRepo.findById(actualAnswer.getId())).thenReturn(Optional.of(ans));
		Optional<Answer> saved = ansRepo.findById(actualAnswer.getId());
		
		Assertions.assertThat(saved.get().getId()).isEqualTo(actualAnswer.getId());
		Assertions.assertThat(actualAnswer.getAnswer()).isEqualTo(ans.getAnswer());
	}
	
	@Test
	@DisplayName("should delete answer from database")
	public void shouldDeleteAnswer() {
		IAnswerService ansService = new AnswerServiceImpl(ansRepo, queRepo);
		
//		Mockito.verify(ansRepo, times(1)).deleteById(13);
		
		String actualResponse = ansService.deleteAnswer(13);
		
		Assertions.assertThat(actualResponse).isEqualTo("Answer is deleted 13");
	}
	
	@Test
	@DisplayName("should retrieve all reported answers")
	public void shouldFetchReportedAnswers() {
		IAnswerService ansService = new AnswerServiceImpl(ansRepo, queRepo);

		List<Answer> answers = new ArrayList<>();
		Category category = new Category(1, "Computer Science", 1, true);
		Question q = new Question("How does hibernate work internally?", true, LocalDate.parse("2021-03-06"), category);
		answers.add(new Answer(q, "Hibernate uses sessions to save entities", LocalDate.parse("2020-03-08"), true));
		answers.add(new Answer(q, "Hibernate does dirty checking at the end of transactions",
				LocalDate.parse("2020-03-08"), true));
		answers.add(new Answer(q, "Hibernate is an ORM tool", LocalDate.parse("2020-03-08"), true));
		
		Mockito.when(ansRepo.findByIsReported(true)).thenReturn(answers);
		
		List<Answer> actualAnswers = ansService.fetchReportedAnswers();
		Assertions.assertThat(actualAnswers.size()).isEqualTo(answers.size());
		Assertions.assertThat(actualAnswers.get(0).getAnswer()).isEqualTo(answers.get(0).getAnswer());
	}
	
	@Test
	@DisplayName("should remove report flag from answer")
	public void shouldRemoveReport() {
		IAnswerService ansService = new AnswerServiceImpl(ansRepo, queRepo);
		
		Category category = new Category(1, "Computer Science", 1, true);
		Question q = new Question("How does hibernate work internally?", true, LocalDate.parse("2021-03-06"), category);
		Answer a = new Answer(q, "Hibernate uses sessions to save entities", LocalDate.parse("2020-03-08"), true);
		a.setId(1);
		
		Mockito.when(ansRepo.findById(a.getId())).thenReturn(Optional.of(a));
		Mockito.when(ansRepo.save(a)).thenReturn(a);
		
		Answer actualAnswer = ansService.removeReport(a);
		Assertions.assertThat(actualAnswer.getIsReported()).isEqualTo(false);
	}
	
	@Test
	@DisplayName("should add report flag from answer")
	public void shouldAddReport() {
		IAnswerService ansService = new AnswerServiceImpl(ansRepo, queRepo);
		
		Category category = new Category(1, "Computer Science", 1, true);
		Question q = new Question("How does hibernate work internally?", true, LocalDate.parse("2021-03-06"), category);
		Answer a = new Answer(q, "jfoifj apfojpo sdfpsp spfjpp", LocalDate.parse("2021-03-23"), false);
		a.setId(13);
		
		Mockito.when(ansRepo.findById(a.getId())).thenReturn(Optional.of(a));
		Mockito.when(ansRepo.save(a)).thenReturn(a);
		
		Answer actualAnswer = ansService.addReport(a);
		Assertions.assertThat(actualAnswer.getIsReported()).isEqualTo(true);
	}

}
