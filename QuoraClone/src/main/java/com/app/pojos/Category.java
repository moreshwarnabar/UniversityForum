package com.app.pojos;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "categories")
public class Category extends BaseEntity {
	
	@Column(length = 25, unique = true)
	private String name;
	
	@Column(name = "num_of_subscribers")
	private int numberOfSubscribers;
	
	@Column()
	private boolean facultyAccess;
	
	@ManyToMany(cascade = {CascadeType.MERGE,CascadeType.PERSIST},mappedBy = "categoriesSubscribed")
	@JsonIgnoreProperties("categoriesSubscribed")
	private Set<User> subscribers = new HashSet<>();

	// one to many with question
	
	public Category() {
		System.out.println("In default constructor of " + getClass().getName());
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getNumberOfSubscribers() {
		return numberOfSubscribers;
	}

	public void setNumberOfSubscribers(int numberOfSubscribers) {
		this.numberOfSubscribers = numberOfSubscribers;
	}

	public boolean isFacultyAccess() {
		return facultyAccess;
	}

	public void setFacultyAccess(boolean blockedForFaculty) {
		this.facultyAccess = blockedForFaculty;
	}

	public Set<User> getSubscribers() {
		return subscribers;
	}

	public void setSubscribers(Set<User> subscribers) {
		this.subscribers = subscribers;
	}

	@Override
	public String toString() {
		return "Category [name=" + name + ", numberOfSubscribers=" + numberOfSubscribers + ", blockedForFaculty="
				+ facultyAccess + "]";
	}

	public void editNumberOfSubscribers(int i) {
		this.numberOfSubscribers += i;
	}	
	
}
