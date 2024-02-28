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

@AutoConfigureMockMvc
@SpringBootTest
public class AdminLoginControllerTest {


    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithMockUser
    void loginTest() throws Exception {
        //ARRANGE
        //ACT
        MvcResult mvcResult = mockMvc.perform(get("/api/admin/login")).andReturn();
        //ASSERT
        assertEquals(202, mvcResult.getResponse().getStatus());

    }
}
