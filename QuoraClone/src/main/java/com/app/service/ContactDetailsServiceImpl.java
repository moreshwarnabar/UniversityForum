package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.customexception.ContactDetailsNotFoundException;
import com.app.customexception.UserNotFoundException;
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

	public ContactDetailsServiceImpl() {
	}

	public ContactDetailsServiceImpl(ContactDetailsRepository contactDetailsRepo, UserRepository userRepo) {
		this.contactDetailsRepo = contactDetailsRepo;
		this.userRepo = userRepo;
	}

	@Override
	public ContactDetails fetchContactDetails(int id) {
		ContactDetails c = contactDetailsRepo.findById(id)
				.orElseThrow(() -> new ContactDetailsNotFoundException("Contact details not found"));
		return c;
	}

	@Override
	public List<ContactDetails> fetchAllContactDetails() {
		List<ContactDetails> contacts = contactDetailsRepo.findAll();

		if (contacts.isEmpty()) {
			throw new ContactDetailsNotFoundException("No Contact details found");
		}
		return contacts;
	}

	@Override
	public ContactDetails saveContactDetails(ContactDetails details, int id) {

		User u = userRepo.findById(id).orElseThrow(() -> new UserNotFoundException("No user registered for id " + id));

		details.setUser(u);

		ContactDetails c = contactDetailsRepo.save(details);

		return c;
	}

	@Override
	public ContactDetails updateContactDetails(ContactDetails details) {

		contactDetailsRepo.save(details);

		return details;
	}

	@Override
	public String deleteContactDetails(int id) {

		contactDetailsRepo.deleteById(id);

		return "Deleted contact Details";
	}

}
