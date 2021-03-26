package com.app.controller;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.app.pojos.Faculty;
import com.app.service.IFacultyService;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(controllers = FacultyController.class) 
//In this case , configures only ProductController class n no other beans
class FacultyControllerTest {
	@Autowired
	private FacultyController controller;
	@Autowired
	private MockMvc mockMvc;// entry point to testing MVC : simulates HTTP requests.

	@MockBean // replaces FacultyService by it's mock (method are not delegated to actual
				// implementation class)
	private IFacultyService service;
	@Autowired
	private ObjectMapper mapper;// Jackson supplied class for JSON processing.

	@Test
	void sanityTest() {
		assertNotNull(controller);// To confirm if FacultyController is autowired correctly.
	}

	@Test
	public void testFetchFaculty() throws Exception {
		Faculty f = new Faculty("Economics", "Prof.", 3,  LocalDate.parse("2020-01-21"));
		when(service.fetchFacultyDetails(3)).thenReturn(f);
		// performs a request get with path var=3
		mockMvc.perform(get("/faculty/3")). 
		andExpect(jsonPath("$.result.department").value("Economics")). //in resulting JSON : checks key name n asserts its value 
		andExpect(status().isOk());//chks if HttpStatus is OK
		verify(service).fetchFacultyDetails(any(Integer.class));	
	}

	@Test
	public void testAddFaculty() throws Exception {
		Faculty f = new Faculty("Economics", "Prof.", 3,  LocalDate.parse("2020-01-21"));//hard coding faculty details
		f.setId(3);
		//when mocked service's addFaculty method is called : then it will return : f
		when(service.addFaculty(any(Faculty.class), any(Integer.class))).thenReturn(f); 
		mockMvc.perform(post("/faculty/3"). //performs a post request
				content(jsonString(f)). //setting request body as f
				contentType(MediaType.APPLICATION_JSON)) //setting request's content type header
				.andExpect(status().isCreated())//chks if HttpStatus is CREATED
				.andExpect(jsonPath("$.result.department").value("Economics"))//in the response : json key(faculty department) : Economics
				.andExpect(jsonPath("$.result.id").value(3));
		verify(service).addFaculty(any(Faculty.class), any(Integer.class));
	}
	
	@Test
	public void testUpdateFaculty() throws Exception{
		Faculty f = new Faculty("Economics", "Prof.", 3,  LocalDate.parse("2020-01-21"));
		f.setId(3);
		when(service.updateFacultyDetails(any(Faculty.class))).thenReturn(f);
		mockMvc.perform(put("/faculty"). //performs a put request
				content(jsonString(f)). //setting request body as p
				contentType(MediaType.APPLICATION_JSON)) //setting request's content type header
				.andExpect(status().isOk())//chks if HttpStatus is OK
				.andExpect(jsonPath("$.result.department").value("Economics"))//in the response : json key(faculty department) : Economics
				.andExpect(jsonPath("$.result.id").value(3));
		verify(service).updateFacultyDetails(any(Faculty.class));
	}
	
	@Test
	public void testDeleteFaculty() throws Exception{
		Faculty f = new Faculty("Economics", "Prof.", 3,  LocalDate.parse("2020-01-21"));
		f.setId(3);
		when(service.deleteFaculty(any(Integer.class))).thenReturn("Faculty with id 3 deleted");
		mockMvc.perform(delete("/faculty/3"). //performs a post request
				content(jsonString(f)). //setting request body as p
				contentType(MediaType.APPLICATION_JSON)) //setting request's content type header
				.andExpect(status().isOk());//chks if HttpStatus is OK
		verify(service).deleteFaculty(any(Integer.class));
	}

	public String jsonString(Object obj) throws Exception {

		return mapper.writeValueAsString(obj);

	}

}
