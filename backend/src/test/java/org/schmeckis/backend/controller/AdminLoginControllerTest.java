package org.schmeckis.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

@AutoConfigureMockMvc
@SpringBootTest
public class AdminLoginControllerTest {


    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithMockUser(roles = "ADMIN")
    void meTest() throws Exception {
        //ARRANGE
        //ACT
        MvcResult mvcResult = mockMvc.perform(get("/api/admin/me"))
                .andExpect(content().json("{\"role\":\"[ROLE_ADMIN]\"}"))
                .andReturn();
        //ASSERT
        assertEquals(200, mvcResult.getResponse().getStatus());

    }

    @Test
    void meTestNotLoggedIn() throws Exception {
        //ARRANGE
        //ACT
        MvcResult mvcResult = mockMvc.perform(get("/api/admin/me")).andReturn();
        //ASSERT
        assertEquals(401, mvcResult.getResponse().getStatus());


    }

    @Test
    void loginTestNotLoggedIn() throws Exception {
        //ARRANGE
        //ACT
        MvcResult mvcResult = mockMvc.perform(get("/api/admin/login")).andReturn();
        //ASSERT
        assertEquals(401, mvcResult.getResponse().getStatus());


    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void loginTestLoggedIn() throws Exception {
        //ARRANGE
        //ACT
        MvcResult mvcResult = mockMvc.perform(get("/api/admin/login")).andReturn();
        //ASSERT
        assertEquals(202, mvcResult.getResponse().getStatus());
    }
}
