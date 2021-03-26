package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity

@Table(name = "students")

public class Student extends BaseEntity {

	// one to one unidirectional with user
	@Column(name = "stream", length = 25)
	private String stream;

	@Column(name = "branch", length = 25)
	private String branch;

	@Column(name = "year", length = 25)
	private String year;

	// one to one unidirectional with user
	@OneToOne
	@JoinColumn(name = "user_id", nullable = false)
	@MapsId // shared primary key
	@JsonIgnore
	private User user;

//constructors
	public Student() {
	}

	public Student(String stream, String branch, String year) {
		super();
		this.stream = stream;
		this.branch = branch;
		this.year = year;
	}

//getters and setters
	public String getStream() {
		return stream;
	}

	public void setStream(String stream) {
		this.stream = stream;
	}

	public String getBranch() {
		return branch;
	}

	public void setBranch(String branch) {
		this.branch = branch;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "Student [stream=" + stream + ", branch=" + branch + ", year=" + year + "]";		//removed User prop. from toString()
	}

}
