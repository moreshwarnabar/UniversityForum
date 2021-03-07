package com.app.service;

import java.util.List;

import com.app.pojos.User;

public interface IUserService {
	
	List<User> fetchAllUsers();
	
	User authenticateUser(String username, String password);
	
	User save(User user);

	User update(User user);
	
}
