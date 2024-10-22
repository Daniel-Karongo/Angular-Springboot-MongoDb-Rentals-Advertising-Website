package com.housesearchKE.api_gateway_service.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    @GetMapping("/")
    public String home(HttpServletRequest request) {
        return "Hello world " + request.getSession().getId();
    }

//    @GetMapping("/csrf_token")
//    public CsrfToken csrfToken(HttpServletRequest request) {
//        return (CsrfToken) request.getAttribute("_csrf");
//    }
}
