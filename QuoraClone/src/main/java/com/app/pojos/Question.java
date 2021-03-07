package com.app.pojos;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "questions")
public class Question extends BaseEntity {

	@Column(length = 80)
	private String description;

	@Column(name = "is_answered")
	private boolean isAnswered;

	@Column(name = "asked_on")
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate askedOn;

	@ManyToOne
	@JoinColumn(name = "user_id")
	@JsonIgnoreProperties(value = { "dateOfBirth", "gender", "isBlocked", "username", "password", "questionsAsked",
			"categoriesSubscribed" })
	private User askedBy;

	@ManyToOne
	@JoinColumn(name = "category_id")
	@JsonIgnoreProperties(value = { "questions", "subscribers" })
	private Category category;

	// one to many with answer

	public Question() {
		System.out.println("In default constructor of " + getClass().getName());
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public boolean isAnswered() {
		return isAnswered;
	}

	public void setAnswered(boolean isAnswered) {
		this.isAnswered = isAnswered;
	}

	public LocalDate getAskedOn() {
		return askedOn;
	}

	public void setAskedOn(LocalDate askedOn) {
		this.askedOn = askedOn;
	}

	public User getAskedBy() {
		return askedBy;
	}

	public void setAskedBy(User askedBy) {
		this.askedBy = askedBy;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	@Override
	public String toString() {
		return "Question [description=" + description + ", isAnswered=" + isAnswered + ", askedOn=" + askedOn
				+ ", askedBy=" + askedBy + ", category=" + category + "]";
	}

}
