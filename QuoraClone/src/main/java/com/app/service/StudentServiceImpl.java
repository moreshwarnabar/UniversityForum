package com.app.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.customexception.StudentNotFoundException;
import com.app.customexception.UserNotFoundException;
import com.app.pojos.Student;
import com.app.pojos.User;
import com.app.repository.StudentRepository;
import com.app.repository.UserRepository;
@Service
@Transactional
public class StudentServiceImpl implements IStudentService {

	@Autowired
	private StudentRepository studentRepo;
	@Autowired
	private UserRepository userRepo;
	
	@Override
	public Student fetchStudents(int id) {
		Student student = studentRepo.findById(id).orElseThrow(() -> new StudentNotFoundException("Student not found"));

return student;
	}
	
	
	@Override
	public Student saveStudentDetails(Student details,int id) {
		
		System.out.println(details);
		User u = userRepo.findById(id)			//UserRepo used here
				.orElseThrow(() -> new UserNotFoundException("User not found "));
		
		System.out.println(u);
		
		details.setUser(u);
		
		Student c = studentRepo.save(details);
		return c;
	
	}

	
	@Override
	public Student updateStudentDetails(Student details) {
		System.out.println("in service "+details);
		System.out.println(details.getUser().getId());

		studentRepo.save(details);
		return details;
		}
	
	@Override
	public String deleteStudentDetails(int id) {
		studentRepo.deleteById(id);
		return "Deleted student Details";
	}

}

