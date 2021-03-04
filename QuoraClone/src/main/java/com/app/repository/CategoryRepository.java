package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.pojos.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
	
	@Query("select c.name from Category c")
	List<String> fetchAllNames();
	
}
