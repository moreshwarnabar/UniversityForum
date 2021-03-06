package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.pojos.Question;
import com.app.pojos.User;
import com.app.repository.QuestionRepository;
import com.app.repository.UserRepository;

@Service
@Transactional
public class UserServiceImpl implements IUserService {
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private QuestionRepository questionRepo;

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
		user.getCategoriesSubscribed().size();
		return user;
	}

	@Override
	public User save(User user) {
		return userRepo.save(user);
	}

	@Override
	public User update(User user) {
		List<Question> questions = questionRepo.findByAskedBy(user);
		System.out.println(questions);
		user.setQuestionsAsked(questions);
		
		return userRepo.save(user);
	}

}
