package com.app.service;

import java.util.List;

import com.app.pojos.Student;

public interface IStudentService {

Student fetchStudents(int id);
	
 Student saveStudentDetails(Student details,int id);
 
 Student updateStudentDetails(Student details);
 
 String deleteStudentDetails(int id);
 
	
}
