package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.pojos.Student;
import com.app.service.IStudentService;

@RestController
@RequestMapping("/students")
public class StudentController {

	public StudentController() {
		System.out.println("in the constr- "+getClass().getName());
	}
	
	@Autowired
	private IStudentService StudentService;
	
	//get all student details
	@GetMapping("/{id}")
	public Student fetchStudents(@PathVariable int id){
		Student students = StudentService.fetchStudents(id);
		System.out.println(students);
		return students;
	}
	
	@PostMapping("/{id}")
	public Student addStudentDetails(@RequestBody Student details,@PathVariable int id) {
		
		return StudentService.saveStudentDetails(details,id);
	}
	
	@PutMapping("/")
	public Student updateStudentDetails(@RequestBody Student details) {
		System.out.println("in controller -"+ details);
		Student c= StudentService.updateStudentDetails(details);
		System.out.println(c);
		return c;
	}
	
	@DeleteMapping("/{id}")
	public String deleteStudentDetails(@PathVariable int id) {
		return StudentService.deleteStudentDetails(id);
		
	}
}
