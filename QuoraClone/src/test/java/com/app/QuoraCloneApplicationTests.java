package com.app;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;

import com.app.pojos.User;
import com.app.service.IUserService;

@SpringBootTest
class QuoraCloneApplicationTests {

	@Autowired
	private IUserService userService;
	
	@Test
	void contextLoads() {
	}
	
	@Test
	void testAuthenticateUserByUsernameAndPassword() {
		User user = userService.authenticateUser("john1998", "john123");
		Assertions.assertEquals(user.getUsername(), "john199811");
	}
	


}
