package com.app.pojos;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "users")
public class User extends BaseEntity {
	
	@Column(name = "first_name", length = 25)
	private String firstName;
	
	@Column(name = "last_name", length = 25)
	private String lastName;
	
	@Column(name = "date_of_birth")
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate dateOfBirth;
	
	@Enumerated(EnumType.STRING)
	private Gender gender;
	
	@Column(name = "is_blocked")
	private boolean isBlocked;
	
	@Column(length = 20, unique = true)
	private String username;
	
	@Column(length = 15, nullable = false)
	private String password;
	
	@Enumerated(EnumType.STRING)
	private Role role;
	
	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "askedBy")
	@JsonIgnoreProperties(value = {"askedBy", "category"})
	private List<Question> questionsAsked = new ArrayList<>();
	
	@ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
	@JoinTable(name = "subscriptions",
			   joinColumns = @JoinColumn(name = "user_id"),
			   inverseJoinColumns = @JoinColumn(name = "category_id")
			   )
	@JsonIgnoreProperties(value = {"subscribers", "questions"})
	private Set<Category> categoriesSubscribed = new HashSet<>();
	
	public User() {
		System.out.println("In defaul constructor of " + getClass().getName());
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public LocalDate getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(LocalDate dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	public boolean isBlocked() {
		return isBlocked;
	}

	public void setBlocked(boolean isBlocked) {
		this.isBlocked = isBlocked;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public Set<Category> getCategoriesSubscribed() {
		return categoriesSubscribed;
	}

	public void setCategoriesSubscribed(Set<Category> categoriesSubscribed) {
		this.categoriesSubscribed = categoriesSubscribed;
	}

	public List<Question> getQuestionsAsked() {
		return questionsAsked;
	}

	public void setQuestionsAsked(List<Question> questionsAsked) {
		this.questionsAsked = questionsAsked;
	}

	@Override
	public String toString() {
		return "User [firstName=" + firstName + ", lastName=" + lastName + ", dateOfBirth=" + dateOfBirth + ", gender="
				+ gender + ", isBlocked=" + isBlocked + ", username=" + username + ", password=" + password + ", role="
				+ role + "]";
	}
	
	// helper methods
	
	public void addSubscription(Category c) {
		categoriesSubscribed.add(c);
		c.editNumberOfSubscribers(1);
		c.getSubscribers().add(this);
	}
	
	public void removeSubscription(Category c) {
		categoriesSubscribed.remove(c);
		c.editNumberOfSubscribers(-1);
		c.getSubscribers().remove(this);
	}
	
}
