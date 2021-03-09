package com.app.service;

import com.app.pojos.Faculty;

public interface IFacultyService {
	
	Faculty fetchFacultyDetails(int facultyId);
	
	Faculty addFaculty(Faculty f, int facultyId);
	
	Faculty updateFacultyDetails(Faculty f); 
	
	String deleteFaculty(int facultyId);

}
