package com.app.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
	public User updateSubscription(User u, int id) {
		Optional<Category> cat = u.getCategoriesSubscribed()
			.stream()
			.filter(c -> c.getId() == id)
			.findFirst();
		
		if (cat.isPresent()) {
			u.removeSubscription(cat.get());
			userRepo.save(u);
			return u;
		} 
		
		Category category = catRepo.findById(id)
								.orElseThrow(() -> new RuntimeException("no category"));
		u.addSubscription(category);
		userRepo.save(u);
		return u;
	}

}
