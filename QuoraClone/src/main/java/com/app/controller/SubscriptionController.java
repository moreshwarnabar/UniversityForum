package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.pojos.User;
import com.app.service.ISubscriptionService;

@RestController
@RequestMapping("/subscriptions")
public class SubscriptionController {
	
	@Autowired
	private ISubscriptionService subscriptionService;
	
	@PutMapping("/{userId}/{categoryId}")
	public User addSubscription(@PathVariable int userId, @PathVariable int categoryId) {
		return subscriptionService.updateSubscription(userId, categoryId);
	}
	
}
