package com.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	
	Optional<User> findByUsernameAndPassword(String username, String password);
	
	Optional<User> findByUsername(String username);
	
}
