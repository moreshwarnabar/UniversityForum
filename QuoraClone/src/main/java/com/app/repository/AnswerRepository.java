package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Answer;
import com.app.pojos.Question;

public interface AnswerRepository extends JpaRepository<Answer, Integer> {

	List<Answer> findByQuestion(Question q);
	
	List<Answer> findByIsReported(boolean isReported);

}
