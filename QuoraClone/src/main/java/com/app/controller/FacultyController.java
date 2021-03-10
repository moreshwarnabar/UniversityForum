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
import com.app.pojos.Faculty;
import com.app.service.IFacultyService;

@RestController
@RequestMapping("/faculty")
@CrossOrigin
public class FacultyController {
	
	@Autowired
	private IFacultyService facultyService;
	
	public FacultyController() {
		System.out.println("in ctor of " + getClass().getName());
	}
	
	@GetMapping("/{facultyId}")
	public ResponseEntity<?> fetchFaculty(@PathVariable int facultyId) {
		return ResponseEntity.ok(new ResponseDTO<>(facultyService.fetchFacultyDetails(facultyId)));
	}
	
	@PostMapping("/{facultyId}")
	public ResponseEntity<?> addFaculty(@RequestBody Faculty f,@PathVariable int facultyId) {
		return new ResponseEntity<>(new ResponseDTO<>(facultyService.addFaculty(f, facultyId)), HttpStatus.CREATED);
	}
	
	@PutMapping
	public ResponseEntity<?> updateFaculty(@RequestBody Faculty f) {
		return ResponseEntity.ok(new ResponseDTO<>(facultyService.updateFacultyDetails(f)));
	}
	
	@DeleteMapping("/{facultyId}")
	public ResponseEntity<?> deleteFaculty(@PathVariable int facultyId) {
		return ResponseEntity.ok(new ResponseDTO<>(facultyService.deleteFaculty(facultyId)));
	}
}
