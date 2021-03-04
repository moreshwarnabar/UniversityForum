package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.service.ICategoryService;

@RestController
@RequestMapping("/category")
public class CategoryController {
	
	@Autowired
	private ICategoryService catService;
	
	@GetMapping("")
	public List<String> fetchCategoryTitles() {		
		return catService.fetchAllCategoryNames();
	}
	
}
