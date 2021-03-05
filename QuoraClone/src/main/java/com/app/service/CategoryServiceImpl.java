package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.pojos.Category;
import com.app.pojos.Role;
import com.app.repository.CategoryRepository;

@Service
@Transactional
public class CategoryServiceImpl implements ICategoryService {

	@Autowired
	private CategoryRepository catRepo;
	
	@Override
	public List<String> fetchAllCategoryNames(Role role) {
		if (role == Role.valueOf("FACULTY")) 
			return catRepo.fetchAllNamesForRole(true);

		return catRepo.fetchAllNames();
	}

	@Override
	public Category createCategory(Category c) {
		c.setNumberOfSubscribers(0);
		catRepo.save(c);
		return c;
	}

}
