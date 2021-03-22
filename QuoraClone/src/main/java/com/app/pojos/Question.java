package com.app.pojos;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

	@OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnore
	private List<Answer> answers= new ArrayList<>();

	public Question() {
		System.out.println("In default constructor of " + getClass().getName());
	}

	public Question(String description, boolean isAnswered, LocalDate askedOn, Category category) {
		this.description = description;
		this.isAnswered = isAnswered;
		this.askedOn = askedOn;
		this.category = category;
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

	public List<Answer> getAnswers() {
		return answers;
	}

	public void setAnswers(List<Answer> answers) {
		this.answers = answers;
	}

	@Override
	public String toString() {
		return "Question [description=" + description + ", isAnswered=" + isAnswered + ", askedOn=" + askedOn
				+ ", askedBy=" + askedBy + ", category=" + category + "]";
	}

}
