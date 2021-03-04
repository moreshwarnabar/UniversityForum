package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.repository.CategoryRepository;

@Service
@Transactional
public class CategoryServiceImpl implements ICategoryService {

	@Autowired
	private CategoryRepository catRepo;
	
	@Override
	public List<String> fetchAllCategoryNames() {
		List<String> categoryNames = catRepo.fetchAllNames();

		return categoryNames;
	}

}
