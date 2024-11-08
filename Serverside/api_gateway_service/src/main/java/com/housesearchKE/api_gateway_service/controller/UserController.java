package com.housesearchKE.api_gateway_service.controller;

import com.housesearchKE.api_gateway_service.model.PropertyOwner;
import com.housesearchKE.api_gateway_service.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/user/register")
    public PropertyOwner registerUser(@RequestBody PropertyOwner user) {
        return userService.registerUser(user);
    }

    @GetMapping("/users")
    public List<PropertyOwner> getUsers() {
        return userService.getUsers();
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody PropertyOwner user, HttpServletResponse response) {
        return userService.verifyUser(user, response);
    }

    @PostMapping("/api/login")
    public ResponseEntity<String> loginViaPostman(@RequestBody PropertyOwner user, HttpServletResponse response) {
        return userService.verifyUser(user, response);
    }

    @GetMapping("/user")
    public Principal getUser(Principal principal) {
        System.out.println("Getting user");
        return principal;
    }

}
