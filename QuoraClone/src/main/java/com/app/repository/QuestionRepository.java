package com.app.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Category;
import com.app.pojos.Question;
import com.app.pojos.User;

public interface QuestionRepository extends JpaRepository<Question, Integer> {

	List<Question> findByCategoryOrderByAskedOnDesc(Category c);
	
	List<Question> findByDescriptionContainingAndCategory(String description, Category c);
	
	List<Question> findByAskedBy(User u);
	
	List<Question> findByAskedOnAfterAndCategory(LocalDate askedAfter ,Category c);

}
