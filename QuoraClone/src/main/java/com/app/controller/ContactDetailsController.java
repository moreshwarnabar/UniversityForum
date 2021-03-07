package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.pojos.ContactDetails;
import com.app.service.IContactDetailsService;

@RestController
@RequestMapping("/contacts")
public class ContactDetailsController {

	public ContactDetailsController() {
		System.out.println("in the constr- " + getClass().getName());
	}

	@Autowired
	private IContactDetailsService contactDetailsService;

	// get contact details by user or contact id
	@GetMapping("/{id}")
	public ContactDetails fetchContactDetails(@PathVariable int id) {
		ContactDetails c = contactDetailsService.fetchContactDetails(id);
		System.out.println(c);
		return c;
	}

	// get all contact details
	@GetMapping("/")
	public List<ContactDetails> fetchAllContactDetails() {
		List<ContactDetails> contacts = contactDetailsService.fetchAllContactDetails();
		System.out.println(contacts);
		return contacts;
	}

	@PostMapping("/{id}")
	public ContactDetails addContactDetails(@RequestBody ContactDetails details, @PathVariable int id) {

		return contactDetailsService.saveContactDetails(details, id);
	}

	@PutMapping("/")
	public ContactDetails updateContactDetails(@RequestBody ContactDetails details) {
		System.out.println("in controller -" + details);
		ContactDetails c = contactDetailsService.updateContactDetails(details);
		System.out.println(c);
		return c;
	}

	@DeleteMapping("/{id}")
	public String deleteContactDetails(@PathVariable int id) {
		return contactDetailsService.deleteContactDetails(id);

	}
}
