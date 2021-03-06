package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.pojos.User;
import com.app.service.IUserService;

@RestController
@RequestMapping("/users")
public class UserController {
	
	@Autowired
	private IUserService userService;
	
	@GetMapping("/")
	public List<User> fetchUsers() {
		return userService.fetchAllUsers();
	}
	
	@GetMapping("/{username}/{password}")
	public User fetchUser(@PathVariable String username, @PathVariable String password) {
		return userService.fetchUser(username, password);
	}
	
	@PostMapping("/")
	public User addUser(@RequestBody User user) {
		return userService.save(user);
	}	
	
	@PutMapping("/")
	public User updateUser(@RequestBody User user) {
		return userService.update(user);
	}
	
}
