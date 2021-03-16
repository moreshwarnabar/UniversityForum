package com.app.service;

import java.util.List;

import com.app.pojos.Question;
import com.app.pojos.Role;
import com.app.pojos.User;

public interface IUserService {
	
	List<User> fetchAllUsers();
	
	List<User> filteredUsers(List<Role> roles);
	
	List<Question> fetchUserQuestions(int userId);
	
	User authenticateUser(String username, String password);
	
	User save(User user);

	User update(User user);
	
}
