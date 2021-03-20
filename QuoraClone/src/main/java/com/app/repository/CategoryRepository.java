package com.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
	
	List<Category> findByFacultyAccess(boolean access);

	Optional<Category> findByName(String name);
	
}