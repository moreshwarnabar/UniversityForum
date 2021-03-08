package com.app.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.customexception.CategoryNotFoundException;
import com.app.customexception.UserNotFoundException;
import com.app.pojos.Category;
import com.app.pojos.User;
import com.app.repository.CategoryRepository;
import com.app.repository.UserRepository;

@Service
@Transactional
public class SubscriptionService implements ISubscriptionService {

	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private CategoryRepository catRepo;
	
	@Override
	public User updateSubscription(int userId, int categoryId) {
		User u = userRepo.findById(userId)
					.orElseThrow(() -> new UserNotFoundException("No user registered for id " + userId));
		
		Optional<Category> cat = u.getCategoriesSubscribed()
									.stream()
									.filter(c -> c.getId() == categoryId)
									.findFirst();
		
		if (cat.isPresent()) {
			u.removeSubscription(cat.get());
			userRepo.save(u);
			catRepo.save(cat.get());
			return u;
		} 
		
		Category category = catRepo.findById(categoryId)
								.orElseThrow(() -> new CategoryNotFoundException("No category found for id " + categoryId));
		u.addSubscription(category);
		userRepo.save(u);
		return u;
	}

}
