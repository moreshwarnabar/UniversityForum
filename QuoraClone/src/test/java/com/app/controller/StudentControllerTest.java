package com.app.controller;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.app.pojos.Student;
import com.app.service.IStudentService;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(controllers = StudentController.class)//configures only UserController class and no other beans
public class StudentControllerTest {
	
	@Autowired
	private StudentController controller;
	
	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private IStudentService service; 
	
	@Autowired
	private ObjectMapper mapper;// Jackson supplied class for JSON processing.
	
	
	
	@Test
	void sanityTest() {
		assertNotNull(controller);// To confirm if UserController is autowired correctly.		
	}
	
	
	
	@Test
	public void testFetchStudents() throws Exception{
		Student s = new Student("Engineering", "Civil", "2016");
		when(service.fetchStudents(1)).thenReturn(s);
		
		mockMvc.perform(get("/students/1"))
		.andExpect(jsonPath("$.result.stream").value("Engineering"))
		.andExpect(jsonPath("$.result.branch").value("Civil")) 
		.andExpect(status().isOk());
	}
	
	
	@Test
	public void testAddStudentDetails() throws Exception {
		Student s = new Student("Engineering", "Civil", "2016");
		s.setId(1);
		
		when(service.saveStudentDetails((any(Student.class)), (any(Integer.class)))).thenReturn(s); 
		mockMvc.perform(post("/students/1").
				content(jsonString(s)). 
				contentType(MediaType.APPLICATION_JSON)) 
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.result.stream").value("Engineering"))
				.andExpect(jsonPath("$.result.branch").value("Civil"));
	}
	

	@Test
	public void testDeleteStudentDetails() throws Exception {
		
		when(service.deleteStudentDetails(any(Integer.class))).thenReturn("Deleted student Details"); 
		mockMvc.perform(delete("/students/1").			
				
				contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk());
	}
	
	

	public String jsonString(Object obj) throws Exception {
		return mapper.writeValueAsString(obj);
	}
}

