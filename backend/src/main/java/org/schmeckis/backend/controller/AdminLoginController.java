package org.schmeckis.backend.controller;

import org.schmeckis.backend.model.dto.UserResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/admin")
public class AdminLoginController {

    @GetMapping("/me")
    @ResponseStatus(HttpStatus.OK)
    public UserResponse me() throws NoSuchElementException {
        UserResponse user = new UserResponse(SecurityContextHolder.getContext().getAuthentication().getName(), SecurityContextHolder.getContext().getAuthentication().getAuthorities().toString());
        return user;
    }

    @GetMapping("/login")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void login() {
    }


}



