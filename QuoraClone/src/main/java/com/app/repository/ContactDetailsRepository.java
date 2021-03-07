package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.ContactDetails;

public interface ContactDetailsRepository extends JpaRepository<ContactDetails, Integer> {

}
