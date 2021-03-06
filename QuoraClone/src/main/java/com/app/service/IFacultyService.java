package com.app.service;

import com.app.pojos.Faculty;

public interface IFacultyService {
	
	Faculty fetchFacultyDetails(int id);
	
	Faculty addFaculty(Faculty f, int id);
	
	Faculty updateFacultyDetails(Faculty f); 
	
	String deleteFaculty(int id);

}
