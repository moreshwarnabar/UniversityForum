package com.app.service;

import com.app.pojos.User;

public interface ISubscriptionService {
	
	User updateSubscription(int userId, int categoryId); 
	
}
