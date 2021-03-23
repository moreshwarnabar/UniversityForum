package com.app.service;

import static java.time.LocalDate.parse;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.app.pojos.Category;
import com.app.pojos.Gender;
import com.app.pojos.Question;
import com.app.pojos.Role;
import com.app.pojos.User;
import com.app.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

	@Mock
	private UserRepository userRepo;
	

	

	@Test
	public void testAuthenticateUser() {
		
		IUserService userService = new UserServiceImpl(userRepo);
		
		User u = new User("raj", "patil", parse("1998-10-10"), Gender.MALE, false, "rajpatil@university.com", "raj123", Role.STUDENT);
		
		when(userRepo.findByUsernameAndPassword("rajpatil@university.com", "raj123")).thenReturn(Optional.of(u));
		
		Assertions.assertThat(userService.authenticateUser("rajpatil@university.com", "raj123").equals(u));
	
	}

	
	@Test
	public void testFetchAllUsers() {
		
		IUserService userService = new UserServiceImpl(userRepo);
		
		User u = new User("raj", "patil", parse("1998-10-10"), Gender.MALE, false, "rajpatil@university.com", "raj123", Role.STUDENT);
		User u1 = new User("rohit", "sharma", parse("1996-11-09"), Gender.FEMALE, false, "rohit@university.com", "rohit987", Role.FACULTY);
		
		List<User> users = new ArrayList<>(); 
		users.add(u); users.add(u1);
		
		when(userRepo.findAll()).thenReturn(users);
		Assertions.assertThat(userService.fetchAllUsers().equals(users));
	}
	
	
	@Test
	public void testFilteredUsers() {
		
		IUserService userService = new UserServiceImpl(userRepo);
		
		User u = new User("raj", "patil", parse("1998-10-10"), Gender.MALE, false, "rajpatil@university.com", "raj123", Role.STUDENT);
		User u1 = new User("rohit", "sharma", parse("1996-11-09"), Gender.FEMALE, false, "rohit@university.com", "rohit987", Role.FACULTY);
		
		List<User> users = new ArrayList<>(); 
		users.add(u); users.add(u1);
		
		List<Role> roles = new ArrayList<>();
		roles.add(Role.STUDENT);  roles.add(Role.FACULTY);
		
		when(userRepo.fetchByRole(roles)).thenReturn(users);
		Assertions.assertThat(userService.filteredUsers(roles).equals(users));
	}
	
	
	@Test
	public void testFetchUserQuestions() {
		
		IUserService userService = new UserServiceImpl(userRepo);
		
		User u = new User("raj", "patil", parse("1998-10-10"), Gender.MALE, false, "rajpatil@university.com", "raj123", Role.STUDENT);
		
		List<Question> questions = new ArrayList<>();
		
		Category category = new Category(1, "Computer Science", 1, true);
		Question q = new Question("What is OOP?", true, LocalDate.parse("2021-03-06"), category);

		Category category1 = new Category(2, "Arts", 2, true);
		Question q1 = new Question("which history book should refer for B.A history?", true, LocalDate.parse("2020-06-09"), category1);
		
		questions.add(q); questions.add(q1);

		when(userRepo.fetchUserQuestions(1)).thenReturn(Optional.of(u));
		Assertions.assertThat(userService.fetchUserQuestions(1).equals(questions));
	}

}
