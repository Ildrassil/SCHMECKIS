package org.schmeckis.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

@AutoConfigureMockMvc
@SpringBootTest
public class AdminLoginControllerTest {


    @Autowired
    private MockMvc mockMvc;

    void loginTest() {
        //ARRANGE

    }
