package com.app.service;

import java.util.List;

import com.app.pojos.Role;

public interface ICategoryService {
	
	List<String> fetchAllCategoryNames(Role role);

}