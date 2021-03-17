package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.customexception.UserAuthorizationException;
import com.app.customexception.UserNotFoundException;
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
		users.forEach((u) -> u.getCategoriesSubscribed().size());
		System.out.println(users);
		return users;
	}

	@Override
	public User authenticateUser(String username, String password) {
		User user = userRepo.findByUsernameAndPassword(username, password)
				.orElseThrow(() -> new UserAuthorizationException("Invalid username/password"));
		
		if (user.getIsBlocked()) {
			throw new UserAuthorizationException("You have been blocked by admin");
		}
		
		// to fetch the details and avoid lazy initialization exceptions
		user.getCategoriesSubscribed().size();
		return user;
	}

	@Override
	public List<Question> fetchUserQuestions(int userId) {
		User u = userRepo.fetchUserQuestions(userId)
					.orElseThrow(() -> new UserNotFoundException("No user registered for id " + userId));
		return u.getQuestionsAsked();
	}


	@Override
	public User save(User user) {
		return userRepo.save(user);
	}

	@Override
	public User update(User user) {
		User u = userRepo.findById(user.getId())
					.orElseThrow(() -> new UserNotFoundException("No user registered for id " + user.getId()));
		System.out.println(u +" "+u.getId());
		u.setIsBlocked(user.getIsBlocked());
		if (user.getPassword() != null)
			u.setPassword(user.getPassword());
		if(user.getRole() != null)
			u.setRole(user.getRole());
		
		if(user.getFirstName() != null)
		u.setFirstName(user.getFirstName());
		if(user.getLastName() != null)
			u.setLastName(user.getLastName());
		if(user.getDateOfBirth() != null)
			u.setDateOfBirth(user.getDateOfBirth());
		if(user.getGender() != null)
			u.setGender(user.getGender());
		
		u.getCategoriesSubscribed().size();
		return userRepo.save(u);					
	}

	@Override
	public String updatePassword(int userId, String password) {
		if(!password.isEmpty()) {
			User u = userRepo.findById(userId)
					.orElseThrow(() -> new UserNotFoundException("No user registered for id " + userId));
			u.setPassword(password);
			userRepo.save(u);
			return "password changed successfully";
		}
		return "password change failed";
	}
	
	

}
