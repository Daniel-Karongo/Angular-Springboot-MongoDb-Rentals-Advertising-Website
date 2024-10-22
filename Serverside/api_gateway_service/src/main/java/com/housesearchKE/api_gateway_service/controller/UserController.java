package com.housesearchKE.api_gateway_service.controller;

import com.housesearchKE.api_gateway_service.model.PropertyOwner;
import com.housesearchKE.api_gateway_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public String login(@RequestBody PropertyOwner user) {
        return userService.verifyUser(user);
    }

    @PostMapping("/api/login")
    public String loginViaPostman(@RequestBody PropertyOwner user) {
        return userService.verifyUser(user);
    }

    @GetMapping("/user")
    public Principal getUser(Principal principal) {
        return principal;
    }

}
