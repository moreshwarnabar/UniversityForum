package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.pojos.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
	
	@Query("select c.name from Category c where c.facultyAccess = :access")
	List<String> fetchAllNamesForRole(@Param("access") boolean access);

	@Query("select c.name from Category c")
	List<String> fetchAllNames();
	
}