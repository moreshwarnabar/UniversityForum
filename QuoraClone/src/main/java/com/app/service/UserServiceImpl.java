package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.pojos.Question;
import com.app.pojos.User;
import com.app.repository.UserRepository;

@Service
@Transactional
public class UserServiceImpl implements IUserService {
	
	@Autowired
	private UserRepository userRepo;

	@Override
	public List<User> fetchAllUsers() {
		List<User> users = userRepo.findAll();
		System.out.println(users);
		return users;
	}

	@Override
	public User authenticateUser(String username, String password) {
		User user = userRepo.findByUsernameAndPassword(username, password)
				.orElseThrow(() -> new RuntimeException("not found"));
		user.getCategoriesSubscribed().size();
		return user;
	}

	@Override
	public List<Question> fetchUserQuestions(int userId) {
		User u = userRepo.fetchUserQuestions(userId)
					.orElseThrow(() -> new RuntimeException("not found"));
		return u.getQuestionsAsked();
	}


	@Override
	public User save(User user) {
		return userRepo.save(user);
	}

	@Override
	public User update(User user) {
		User u = userRepo.findById(user.getId())
					.orElseThrow(() -> new RuntimeException("not found"));

		u.setIsBlocked(user.getIsBlocked());
		if (user.getPassword() != null)
			u.setPassword(user.getPassword());
		if(user.getRole() != null)
			u.setRole(user.getRole());
		
		u.getCategoriesSubscribed().size();
		return userRepo.save(u);
	}

}
