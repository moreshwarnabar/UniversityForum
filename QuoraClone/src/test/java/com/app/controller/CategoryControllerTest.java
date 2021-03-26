package com.app.controller;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.app.pojos.Category;
import com.app.pojos.Role;
import com.app.service.ICategoryService;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(controllers = CategoryController.class) 
//In this case , configures only CategoryController class n no other beans
class CategoryControllerTest {
	@Autowired
	private CategoryController controller;
	@Autowired
	private MockMvc mockMvc;// entry point to testing MVC : simulates HTTP requests.

	@MockBean // replaces CategoryService by it's mock (method are not delegated to actual
				// implementation class)
	private ICategoryService service;
	@Autowired
	private ObjectMapper mapper;// Jackson supplied class for JSON processing.

	@Test
	void sanityTest() {
		assertNotNull(controller);// To confirm if CategoryController is autowired correctly.
	}
	
	@Test
	public void testFetchCategoryTitles() throws Exception {
		List<String> categoryTitles = new ArrayList<>();
		categoryTitles.add("Anti Ragging");
		categoryTitles.add("Education");
		categoryTitles.add("Basic Details");
		categoryTitles.add("Sports");
		categoryTitles.add("Lifestyle");
		categoryTitles.add("Miscellaneous");	
		when(service.fetchAllCategories(any(Role.class))).thenReturn(categoryTitles);
		// performs a request get with path var=3
		mockMvc.perform(get("/category/STUDENT")). 
		andExpect(jsonPath("$.result[0]").value("Anti Ragging")). //in resulting JSON : checks key name n asserts its value 
		andExpect(status().isOk());//chks if HttpStatus is OK
	}
	
	
	@Test
	public void testCreateCategory() throws Exception {
		Category c = new Category("Anti Ragging", 0, true);//hard coding category details
		c.setId(6);
		//when mocked service's createCategory method is called : then it will return : c
		when(service.createCategory(any(Category.class))).thenReturn(c); 
		mockMvc.perform(post("/category"). //performs a post request//performs a post request
				content(jsonString(c)). //setting request body as c
				contentType(MediaType.APPLICATION_JSON)) //setting request's content type header
				.andExpect(status().isCreated()).//chks if HttpStatus is CREATED
				andExpect(jsonPath("$.result.name").value("Anti Ragging"))//in the response : json key(category name) : Anti Ragging
				.andExpect(jsonPath("$.result.id").value(6));
	}



	public String jsonString(Object obj) throws Exception {

		return mapper.writeValueAsString(obj);

	}

}
