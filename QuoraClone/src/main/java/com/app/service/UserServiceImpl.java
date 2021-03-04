package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.pojos.User;
import com.app.repository.UserRepository;

@Service
@Transactional
public class UserServiceImpl implements IUserService {
	
	@Autowired
	private UserRepository userRepo;

	@Override
	public List<User> fetchAllUsers() {
		List<User> users = userRepo.fetchAll();
		System.out.println(users);
		return users;
	}

	@Override
	public User fetchUser(String username, String password) {
		User user = userRepo.findByUsernameAndPassword(username, password)
				.orElseThrow(() -> new RuntimeException("not found"));
		return user;
	}

	@Override
	public void save(User user) {
		userRepo.save(user);
	}

	@Override
	public void update(User user) {
		int id = userRepo.fetchUser(user.getUsername())
					.orElseThrow(() -> new RuntimeException("not found"))
					.getId();
		user.setId(id);
		userRepo.save(user);
	}

}
