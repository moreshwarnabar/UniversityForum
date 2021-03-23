package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ResponseDTO;
import com.app.pojos.Student;
import com.app.service.IStudentService;

@RestController
@RequestMapping("/students")
@CrossOrigin
public class StudentController {

	public StudentController() {
		System.out.println("in the constr- "+getClass().getName());
	}
	
	@Autowired
	private IStudentService StudentService;
	
	
	@GetMapping("/{id}")
	public ResponseEntity<?> fetchStudents(@PathVariable int id){
		Student students = StudentService.fetchStudents(id);
		System.out.println(students);
		return ResponseEntity.ok(new ResponseDTO<>(students));
	}
	
	@PostMapping("/{id}")
	public ResponseEntity<?>  addStudentDetails(@RequestBody Student details,@PathVariable int id) {
		
		return new ResponseEntity<>(new ResponseDTO<>(StudentService.saveStudentDetails(details,id)), HttpStatus.CREATED);
		
	}
	
	
	@PutMapping("/")
	public ResponseEntity<?>  updateStudentDetails(@RequestBody Student details) {
		System.out.println("in controller -"+ details);
		Student c= StudentService.updateStudentDetails(details);
		System.out.println(c);
		return ResponseEntity.ok(new ResponseDTO<>(c));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?>  deleteStudentDetails(@PathVariable int id) {
		return ResponseEntity.ok(new ResponseDTO<>(StudentService.deleteStudentDetails(id)));
		
	}
}
