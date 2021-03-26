package com.app.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.app.pojos.Gender;
import com.app.pojos.Role;
import com.app.pojos.Student;
import com.app.pojos.User;
import com.app.repository.StudentRepository;
import com.app.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class StudentServiceTest {
	
	@InjectMocks
	private StudentServiceImpl studentService;
	
	@Mock
	private StudentRepository studentRepo;
	
	@Mock
	private UserRepository userRepo;
	
	@Test
	public void testSaveStudentDetails() {
		User u = new User("John", "Doe", LocalDate.parse("1990-02-23"), Gender.MALE, false, "john@university.com", "123", Role.STUDENT);
		Student s = new Student("B.Tech", "Computer Science", "Third");
		s.setUser(u);
		s.setId(1);
		when(userRepo.findById(1)).thenReturn(Optional.of(u));
		when(studentRepo.save(s)).thenReturn(s);
		assertEquals(s, studentService.saveStudentDetails(s, 1));
	}
	
	@Test
	public void testUpdateStudentDetails() {
		Student s = new Student("B.Tech", "Computer Science", "Third");
		when(studentRepo.save(s)).thenReturn(s);
		assertEquals(s, studentService.updateStudentDetails(s));
	}
	
	@Test
	public void testDeleteStudentDetails() {
		assertThat(studentService.deleteStudentDetails(1));
	}

}
