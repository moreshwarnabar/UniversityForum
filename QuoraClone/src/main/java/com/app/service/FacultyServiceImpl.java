package com.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
	public Faculty fetchFacultyDetails(int id) {
		return facultyRepo.findById(id).orElseThrow(() -> new RuntimeException("Invalid Faculty ID..."));
	}

	@Override
	public Faculty addFaculty(Faculty f, int id) {
		
		  User u = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User not found!!"));
		  f.setUser(u);	 
		  return facultyRepo.save(f);
	}
	
	
	 @Override 
	 public Faculty updateFacultyDetails(Faculty f) { 
		return facultyRepo.save(f);
	 }

	@Override
	public String deleteFaculty(int id) {
		facultyRepo.deleteById(id);
		return "Faculty with id "+ id +" deleted";
	}

}
