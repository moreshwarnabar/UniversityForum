package com.app.service;

import java.util.List;

import com.app.pojos.User;

public interface IUserService {
	
	List<User> fetchAllUsers();
	
	User fetchUser(String username, String password);
	
	void save(User user);

	void update(User user);

	User remove(String username);
	
}
