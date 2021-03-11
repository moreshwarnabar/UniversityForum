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
@Table(name = "answers")
public class Answer extends BaseEntity {

	@ManyToOne
	@JoinColumn(name = "question_id")
	@JsonIgnoreProperties("answers")
	private Question question;

	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	@JsonIgnoreProperties(value = { "dateOfBirth", "gender", "isBlocked", "username", "password", "questionsAsked",
			"categoriesSubscribed" })
	private User answerBy;

	@Column(columnDefinition = "TEXT")		//to save answers added Datatype : TEXT
	private String answer;

	@Column(name = "votes")
	private int votes;

	@Column(name = "answered_on")
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate answeredOn;

	@Column(name = "is_reported")
	private boolean isReported;

	
	public User getAnswerBy() {
		return answerBy;
	}

	public void setAnswerBy(User answerBy) {
		this.answerBy = answerBy;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public int getVotes() {
		return votes;
	}

	public void setVotes(int votes) {
		this.votes = votes;
	}

	public LocalDate getAnsweredOn() {
		return answeredOn;
	}

	public void setAnsweredOn(LocalDate answeredOn) {
		this.answeredOn = answeredOn;
	}

	public boolean isReported() {
		return isReported;
	}

	public void setReported(boolean isReported) {
		this.isReported = isReported;
	}

	public Question getQuestion() {
		return question;
	}

	public void setQuestion(Question question) {
		this.question = question;
	}

	@Override
	public String toString() {
		return "Answer [ answer=" + answer + ", votes=" + votes + ", answeredOn=" + answeredOn + ", isReported="
				+ isReported + ", ansBy=" + answerBy + "]";
	}

}