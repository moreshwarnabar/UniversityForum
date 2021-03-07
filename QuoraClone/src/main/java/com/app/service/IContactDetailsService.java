package com.app.service;

import java.util.List;

import com.app.pojos.ContactDetails;

public interface IContactDetailsService {

	ContactDetails fetchContactDetails(int id);

	List<ContactDetails> fetchAllContactDetails();

	ContactDetails saveContactDetails(ContactDetails details, int id);

	ContactDetails updateContactDetails(ContactDetails details);

	String deleteContactDetails(int id);

}
