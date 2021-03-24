package com.app.pojos;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "faculty")
public class Faculty extends BaseEntity {
	
	@Column(length = 30)
	private String department;
	
	@Column(length = 10)
	private String position;
	
	private int experience;
	
	@Column(name = "hire_date")
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate hireDate;
	
	//one to one unidirectional asso. with user    
	//Faculty------>User
	@OneToOne
	@JoinColumn(name = "user_id",nullable = false)
	@MapsId
	@JsonIgnore
	private User user;
	
	public Faculty() {
		System.out.println("in ctor of "+getClass().getName());
	}

	public Faculty(String department, String position, int experience, LocalDate hireDate) {
		super();
		this.department = department;
		this.position = position;
		this.experience = experience;
		this.hireDate = hireDate;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public int getExperience() {
		return experience;
	}

	public void setExperience(int experience) {
		this.experience = experience;
	}

	public LocalDate getHireDate() {
		return hireDate;
	}

	public void setHireDate(LocalDate hireDate) {
		this.hireDate = hireDate;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "Faculty [department=" + department + ", position=" + position + ", experience=" + experience
				+ ", hireDate=" + hireDate + "]";
	}
	
}
