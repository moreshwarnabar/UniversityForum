package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.pojos.ContactDetails;
import com.app.pojos.User;
import com.app.repository.ContactDetailsRepository;
import com.app.repository.UserRepository;

@Service
@Transactional
public class ContactDetailsServiceImpl implements IContactDetailsService {

	@Autowired
	private ContactDetailsRepository contactDetailsRepo;
	@Autowired
	private UserRepository userRepo;
	@Override
	public ContactDetails fetchContactDetails(int id) {
		ContactDetails c = contactDetailsRepo.findById(id)
				.orElseThrow(() -> new RuntimeException("No contact details found"));
		return c;
	}

	@Override
	public List<ContactDetails> fetchAllContactDetails() {
		List<ContactDetails> contacts = contactDetailsRepo.findAll();
		return contacts;
	}

	@Override
	public ContactDetails saveContactDetails(ContactDetails details, int id) {
		System.out.println(id);
		System.out.println(details);
		
		User u = userRepo.findById(id)			//UserRepo used here
				.orElseThrow(() -> new RuntimeException("User not found to add contact details"));
		
		System.out.println(u);
		
		details.setUser(u);
		
		ContactDetails c = contactDetailsRepo.save(details);
		return c;
	}

	@Override
	public ContactDetails updateContactDetails(ContactDetails details) {
		System.out.println("in service "+details);
//		System.out.println(details.getUser().getId());

		
		contactDetailsRepo.save(details);
		return details;
	}

	@Override
	public String deleteContactDetails(int id) {
		
		contactDetailsRepo.deleteById(id);
		
		return "Deleted contact Details";
	}

}
