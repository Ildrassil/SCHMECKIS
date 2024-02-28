package org.schmeckis.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminLoginController {

    @GetMapping("/login")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void login() throws IllegalArgumentException {
        boolean isAuth = SecurityContextHolder.getContext().getAuthentication().isAuthenticated();
        if (!isAuth) {
            throw new IllegalArgumentException("Not logged in");
        }

    }


}
