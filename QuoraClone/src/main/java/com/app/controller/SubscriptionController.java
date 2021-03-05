package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.pojos.User;
import com.app.service.ISubscriptionService;

@RestController
@RequestMapping("/subscription")
public class SubscriptionController {
	
	@Autowired
	private ISubscriptionService subscriptionService;
	
	@PutMapping("/{id}")
	public User addSubscription(@RequestBody User user, @PathVariable int id) {
		return subscriptionService.updateSubscription(user, id);
	}
	
}
