package com.app.pojos;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "contact_details")
public class ContactDetails extends BaseEntity {

	@Column(length = 15)
	private String street;

	@Column(length = 15)
	private String city;

	@Column(length = 15)
	private String state;

	@Column(length = 15)
	private String pinCode;

	@Column(length = 10, unique = true)
	private String phoneNo;// unique

	// one to one unidirectional with user
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	@MapsId // shared primary key
	@JsonIgnore
	private User user;

	// default constructor
	public ContactDetails() {
		System.out.println("in the const - " + getClass().getName());
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getPinCode() {
		return pinCode;
	}

	public void setPinCode(String pinCode) {
		this.pinCode = pinCode;
	}

	public String getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	@JsonIgnore
	public User getUser() {
		return user;
	}

	@JsonProperty
	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "ContactDetails [street=" + street + ", city=" + city + ", state=" + state + ", pinCode=" + pinCode
				+ ", phoneNo=" + phoneNo + "]";
	}

}