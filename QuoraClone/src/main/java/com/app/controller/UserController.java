package com.app.controller;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ResponseDTO;
import com.app.pojos.User;
import com.app.service.IUserService;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {
	
	@Autowired
	private IUserService userService;
	
	@GetMapping
	public ResponseEntity<?> fetchUsers() {
		return ResponseEntity.ok(new ResponseDTO<>(userService.fetchAllUsers()));
	}
	
	@GetMapping("/{username}/{password}")
	public ResponseEntity<?> authenticateLogin(@PathVariable String username, @PathVariable String password) {
		return ResponseEntity.ok(new ResponseDTO<>(userService.authenticateUser(username, password)));
	}
	
	@GetMapping("/{userId}")
	public ResponseEntity<?> fetchUserQuestions(@PathVariable int userId) {
		return ResponseEntity.ok(new ResponseDTO<>(userService.fetchUserQuestions(userId)));
	}
	
	@PostMapping
	public ResponseEntity<?> addUser(@RequestBody User user) {
		return new ResponseEntity<>(new ResponseDTO<>(userService.save(user)), HttpStatus.CREATED);
	}	
	
	
	@PutMapping
	public ResponseEntity<?> updateUser(@RequestBody User user) {
		System.out.println(user);
		return ResponseEntity.ok(new ResponseDTO<>(userService.update(user)));
	}
	
	@PutMapping("/password/{userId}")
	public ResponseEntity<?> updatePassword(@PathVariable int userId, @RequestBody User u) {
		System.out.println(u.getPassword());
		
		return ResponseEntity.ok(new ResponseDTO<>(userService.updatePassword(userId, u.getPassword())));
		
	}
	
}