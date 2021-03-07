package com.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	
	Optional<User> findByUsernameAndPassword(String username, String password);
	
	@Query("select u from User u left join fetch u.questionsAsked where u.id = :id")
	Optional<User> fetchUserQuestions(@Param("id") int userId);
	
	@Query("select u from User u left join fetch u.categoriesSubscribed where u.username = :username")
	Optional<User> fetchUser(@Param("username") String username);
	
	@Query("select u from User u left join fetch u.questionsAsked where u.username = :username")
	Optional<User> fetchUserQuestions(@Param("username") String username);
	
}
