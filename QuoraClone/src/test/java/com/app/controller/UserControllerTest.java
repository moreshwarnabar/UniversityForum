package com.app.controller;

import static java.time.LocalDate.parse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.app.pojos.Gender;

import com.app.pojos.Role;
import com.app.pojos.User;
import com.app.service.IUserService;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(controllers = UserController.class)//configures only UserController class and no other beans
public class UserControllerTest {
	
	@Autowired
	private UserController controller;
	
	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private IUserService service; 
	
	@Autowired
	private ObjectMapper mapper;// Jackson supplied class for JSON processing.
	
	
	
	@Test
	void sanityTest() {
		assertNotNull(controller);// To confirm if UserController is autowired correctly.		
	}
	
	
	
	@Test
	public void testAuthenticateLogin() throws Exception{
		User u = new User("raj", "patil", parse("1998-10-10"), Gender.MALE, false, "rajpatil@university.com", "raj123", Role.STUDENT);
		when(service.authenticateUser("rajpatil@university.com", "raj123")).thenReturn(u);
		
		mockMvc.perform(get("/users/single/rajpatil@university.com/raj123")).
		andExpect(jsonPath("$.result.username").value("rajpatil@university.com")). 
		andExpect(status().isOk())
		.andExpect(jsonPath("$.result.username").value("rajpatil@university.com"))
		.andExpect(jsonPath("$.result.firstName").value("raj"));
	}
	
	
	@Test
	public void testAddUser() throws Exception {
		User u = new User("raj", "patil", parse("1998-10-10"), Gender.MALE, false, "rajpatil@university.com", "raj123", Role.STUDENT);
		
		when(service.save(any(User.class))).thenReturn(u); 
		mockMvc.perform(post("/users"). //performs a post request
				content(jsonString(u)). //setting request body
				contentType(MediaType.APPLICATION_JSON)) //setting request's content type header
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.result.username").value("rajpatil@university.com"))//in the response : json key(product name) : grain
				.andExpect(jsonPath("$.result.firstName").value("raj"));
		
		Mockito.verify(service).save(any(User.class));
	}
	

	
	
	
	@Test
	public void testUpdateUser() throws Exception {
		User u = new User("raj", "patil", parse("1998-10-10"), Gender.MALE, false, "rajpatil@university.com", "raj123", Role.STUDENT);
		
		when(service.update(any(User.class))).thenReturn(u); 
		mockMvc.perform(put("/users").			//performs a put request
				content(jsonString(u)). 		//setting request body
				contentType(MediaType.APPLICATION_JSON)) //setting request's content type header
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.result.username").value("rajpatil@university.com"))//in the response : json key(product name) : grain
				.andExpect(jsonPath("$.result.firstName").value("raj"));
		
		Mockito.verify(service).update(any(User.class));
	}
	
	
	@Test
	public void testUpdatePassword() throws Exception {
		User u = new User("raj", "patil", parse("1998-10-10"), Gender.MALE, false, "rajpatil@university.com", "raj123", Role.STUDENT);
		
		when(service.updatePassword(1, "raj123")).thenReturn("password changed successfully");
		mockMvc.perform(put("/users/password/1").			
				content(jsonString(u)). 					
				contentType(MediaType.APPLICATION_JSON)) 	
				.andExpect(status().isOk());		
	}
	
	public String jsonString(Object obj) throws Exception {
		return mapper.writeValueAsString(obj);
	}
}

