package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
	
	@GetMapping
	public ResponseEntity<?> fetchUsers() {
		return ResponseEntity.ok(userService.fetchAllUsers());
	}
	
	@GetMapping("/{username}/{password}")
	public ResponseEntity<?> authenticateLogin(@PathVariable String username, @PathVariable String password) {
		return ResponseEntity.ok(userService.authenticateUser(username, password));
	}
	
	@GetMapping("/{userId}")
	public ResponseEntity<?> fetchUserQuestions(@PathVariable int userId) {
		return ResponseEntity.ok(userService.fetchUserQuestions(userId));
	}
	
	@PostMapping
	public ResponseEntity<?> addUser(@RequestBody User user) {
		return new ResponseEntity<>(userService.save(user), HttpStatus.CREATED);
	}	
	
	@PutMapping
	public ResponseEntity<?> updateUser(@RequestBody User user) {
		return ResponseEntity.ok(userService.update(user));
	}
	
}