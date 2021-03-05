package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.pojos.Category;
import com.app.pojos.Role;
import com.app.service.ICategoryService;

@RestController
@RequestMapping("/category")
public class CategoryController {
	
	@Autowired
	private ICategoryService catService;
	
	@GetMapping("/{role}")
	public List<String> fetchCategoryTitles(@PathVariable("role") Role role) {		
		return catService.fetchAllCategoryNames(role);
	}
	
	@PostMapping("")
	public Category createCategory(@RequestBody Category c) {
		return catService.createCategory(c);
	}
	
}
