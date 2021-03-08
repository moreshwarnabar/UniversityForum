package com.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.customexception.FacultyHandlingException;
import com.app.customexception.UserNotFoundException;
import com.app.pojos.Faculty;
import com.app.pojos.User;
import com.app.repository.FacultyRepository;
import com.app.repository.UserRepository;

@Service
@Transactional
public class FacultyServiceImpl implements IFacultyService {
	
	@Autowired
	private FacultyRepository facultyRepo;
	
	
	 @Autowired 
	 private UserRepository userRepo;
	 

	@Override
	public Faculty fetchFacultyDetails(int facultyId) {
		return facultyRepo.findById(facultyId).orElseThrow(() -> new FacultyHandlingException("Invalid Faculty ID!"));
	}

	@Override
	public Faculty addFaculty(Faculty f, int facultyId) {
		
		  User u = userRepo.findById(facultyId).orElseThrow(() -> new UserNotFoundException("Faculty can't be added.No user present with id "+f.getId()));
		  f.setUser(u);	 
		  return facultyRepo.save(f);
	}
	
	
	 @Override 
	 public Faculty updateFacultyDetails(Faculty f) { 
	     //Faculty faculty = facultyRepo.findById(f.getId()).orElseThrow(() -> new FacultyHandlingException("Faculty not found : Updation failed!"));
		 return facultyRepo.save(f);
	 }

	@Override
	public String deleteFaculty(int facultyId) {
		Faculty f = facultyRepo.findById(facultyId).orElseThrow(() -> new FacultyHandlingException("Faculty deletion failed : Invalid Faculty ID!"));
		facultyRepo.deleteById(facultyId);
		return "Faculty with id "+facultyId+" deleted";
	}

}
