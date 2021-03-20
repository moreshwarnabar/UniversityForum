package com.app.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.customexception.CategoryExistsException;
import com.app.pojos.Category;
import com.app.pojos.Role;
import com.app.repository.CategoryRepository;

@Service
@Transactional
public class CategoryServiceImpl implements ICategoryService {

	@Autowired
	private CategoryRepository catRepo;
	
	@Override
	public List<Category> fetchAllCategories(Role role) {
		if (role == Role.valueOf("FACULTY")) 
			return catRepo.findByFacultyAccess(true);

		return catRepo.findAll();
	}

	@Override
	public Category createCategory(Category c) {
		Optional<Category> optionalCat = catRepo.findByName(c.getName());	
		if (optionalCat.isPresent()) {
			throw new CategoryExistsException("Category " + c.getName() + " is already created");
		}
		c.setNumberOfSubscribers(0);
		catRepo.save(c);
		return c;
	}

}