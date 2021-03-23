package com.app.service;

import static java.time.LocalDate.parse;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.app.pojos.ContactDetails;
import com.app.pojos.Gender;
import com.app.pojos.Role;
import com.app.pojos.User;
import com.app.repository.ContactDetailsRepository;
import com.app.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class ContactDetailsServiceTest {

	@Mock
	private ContactDetailsRepository contactRepo;
	
	@Mock
	private UserRepository userRepo;
	

	

	@Test
	public void testFetchContactDetails() {
		
		IContactDetailsService contactService = new ContactDetailsServiceImpl(contactRepo, userRepo);
		
		ContactDetails contact = new ContactDetails("Apte road", "Pune", "Maharshtra", "411301", "9970787632");
		
		when(contactRepo.findById(1)).thenReturn(Optional.of(contact));
		
		Assertions.assertThat(contactService.fetchContactDetails(1).equals(contact));
	
	}

	
	@Test
	public void testFetchAllContactDetails() {
		
		IContactDetailsService contactService = new ContactDetailsServiceImpl(contactRepo, userRepo);
		
		ContactDetails contact = new ContactDetails("Apte road", "Pune", "Maharshtra", "411301", "9970787632");
		ContactDetails contact1 = new ContactDetails("fc road", "Mumbai", "Maharshtra", "411501", "8878654909");
		
		List<ContactDetails> contacts = new ArrayList<>(); 
		contacts.add(contact); contacts.add(contact1);
		
		when(contactRepo.findAll()).thenReturn(contacts);
		Assertions.assertThat(contactService.fetchAllContactDetails().equals(contacts));
	}
	
	
	@Test
	public void testSaveContactDetails() {
		
		IContactDetailsService contactService = new ContactDetailsServiceImpl(contactRepo, userRepo);
		
		User u = new User("raj", "patil", parse("1998-10-10"), Gender.MALE, false, "rajpatil@university.com", "raj123", Role.STUDENT);
		ContactDetails contact = new ContactDetails("Apte road", "Pune", "Maharshtra", "411301", "9970787632");
		contact.setUser(u);
			
		when(userRepo.findById(1)).thenReturn(Optional.of(u));
		when(contactRepo.save(contact)).thenReturn(contact);
		
		Assertions.assertThat(contactService.saveContactDetails(contact, 1).equals(contact));
	}
	
	
	@Test
	public void testUpdateContactDetails() {
		IContactDetailsService contactService = new ContactDetailsServiceImpl(contactRepo, userRepo);
		
		ContactDetails contact = new ContactDetails("Apte road", "Pune", "Maharshtra", "411301", "9970787632");

		when(contactRepo.save(contact)).thenReturn(contact);
		Assertions.assertThat(contactService.updateContactDetails(contact).equals(contact));
	}

	
	@Test
	public void testDeleteContactDetails() {
		IContactDetailsService contactService = new ContactDetailsServiceImpl(contactRepo, userRepo);		
		Assertions.assertThat(contactService.deleteContactDetails(1).equals( "Deleted contact Details"));
	}

	
}
