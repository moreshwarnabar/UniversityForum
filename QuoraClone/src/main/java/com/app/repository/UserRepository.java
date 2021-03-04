package com.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.pojos.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	
	@Query("select u from User u left join fetch u.categoriesSubscribed")
	List<User> fetchAll();
	
	Optional<User> findByUsernameAndPassword(String username, String password);
	
	@Query("select u from User u left join fetch u.categoriesSubscribed where u.username = :username")
	Optional<User> fetchUser(@Param("username") String username);
	
}
