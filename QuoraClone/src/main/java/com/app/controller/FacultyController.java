package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.pojos.Faculty;
import com.app.service.IFacultyService;

@RestController
@RequestMapping("/faculty")
public class FacultyController {
	
	@Autowired
	private IFacultyService facultyService;
	
	public FacultyController() {
		System.out.println("in ctor of " + getClass().getName());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Faculty> fetchFaculty(@PathVariable int id) {
		System.out.println("in fetch faculty with id "+id);
		return ResponseEntity.ok(facultyService.fetchFacultyDetails(id));
	}
	
	@PostMapping("/{id}")
	public Faculty addFaculty(@RequestBody Faculty f,@PathVariable int id) {
		return facultyService.addFaculty(f, id);
	}
	
	@PutMapping
	public Faculty updateFaculty(@RequestBody Faculty f) {
		return facultyService.updateFacultyDetails(f);
	}
	
	@DeleteMapping("/{id}")
	public String deleteFaculty(@PathVariable int id) {
		return facultyService.deleteFaculty(id);
	}
}
