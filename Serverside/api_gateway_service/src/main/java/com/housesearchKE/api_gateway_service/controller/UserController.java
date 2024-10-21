package com.housesearchKE.SpringbootSecurityExample.controller;

import com.housesearchKE.SpringbootSecurityExample.model.User;
import com.housesearchKE.SpringbootSecurityExample.service.UserService;
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
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        return userService.verifyUser(user);
    }

    @PostMapping("/api/login")
    public String loginViaPostman(@RequestBody User user) {
        return userService.verifyUser(user);
    }

    @GetMapping("/user")
    public Principal getUser(Principal principal) {
        return principal;
    }

}
