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

import com.app.pojos.Faculty;
import com.app.pojos.Gender;
import com.app.pojos.Role;
import com.app.pojos.User;
import com.app.repository.FacultyRepository;
import com.app.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class FacultyServiceTest {
	
	@InjectMocks
	private FacultyServiceImpl facultyService;
	
	@Mock
	private FacultyRepository facultyRepo;
	
	@Mock
	private UserRepository userRepo;
	
	@Test
	public void testFetchFacultyDetails() {
		Faculty f = new Faculty("Humanities", "HOD", 2, LocalDate.parse("2020-02-13"));
		when(facultyRepo.findById(2)).thenReturn(Optional.of(f));
		assertEquals(f, facultyService.fetchFacultyDetails(2));
	}
	
	@Test
	public void testAddFaculty() {
		IFacultyService facultyService = new FacultyServiceImpl(facultyRepo, userRepo);
		User u = new User("Mark", "Twain", LocalDate.parse("1996-07-16"), Gender.MALE, true, "mark@university.com", "321", Role.FACULTY);
		Faculty f = new Faculty("Comp Sc.", "Ass. Prof.", 8, LocalDate.parse("2020-02-29"));
		f.setUser(u);
		f.setId(4);
		when(userRepo.findById(4)).thenReturn(Optional.of(u));
		when(facultyRepo.save(f)).thenReturn(f);
		assertEquals(f, facultyService.addFaculty(f, 4));
	}
	
	@Test
	public void testUpdateFacultyDetails() {
		Faculty f = new Faculty("Comp Sc.", "Ass. Prof.", 8, LocalDate.parse("2020-02-29"));
		when(facultyRepo.save(f)).thenReturn(f);
		assertEquals(f, facultyService.updateFacultyDetails(f));
	}
	
	@Test
	public void testDeleteFacultyDetails() {
		Faculty f = new Faculty("Comp Sc.", "Ass. Prof.", 8, LocalDate.parse("2020-02-29"));
		when(facultyRepo.findById(2)).thenReturn(Optional.of(f));
		assertThat(facultyService.deleteFaculty(2).equals( "Faculty with id 2 deleted"));
	}

}
