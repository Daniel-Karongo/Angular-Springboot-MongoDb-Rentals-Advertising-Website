package com.housesearchKE.api_gateway_service.service;

import com.housesearchKE.api_gateway_service.model.PropertyOwner;
import com.housesearchKE.api_gateway_service.repo.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private JWTService jwtService;

    public PropertyOwner registerUser(PropertyOwner user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public List<PropertyOwner> getUsers() {
        return userRepository.findAll();
    }


    public ResponseEntity<String> verifyUser(PropertyOwner user, HttpServletResponse response) {
        try {
            // Authenticate the user
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmailAddress(), user.getPassword()));

            // Check if authentication is successful
            if (authentication.isAuthenticated()) {
                String token = jwtService.generateToken(user.getEmailAddress());
                if (token != null) {
                    // Set the JWT as an HTTP-only cookie
                    Cookie cookie = new Cookie("token", token);
                    cookie.setHttpOnly(true);  // Prevents JavaScript access to the cookie
                    cookie.setSecure(true);    // Use in production over HTTPS
                    cookie.setPath("/");       // Makes the cookie accessible on the entire site
                    cookie.setMaxAge(43200);   // Set the cookie expiration (12 hours)

                    // Add the cookie to the response
                    response.addCookie(cookie);

                    // Send the response back with the token (Frontend will handle the redirect)
                    return ResponseEntity.ok("Login successful. Token: " + token);
                } else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed. Token generation error.");
                }
            } else {
                return new ResponseEntity<>("Authentication failed", HttpStatus.UNAUTHORIZED);
            }
        } catch (AuthenticationException e) {
            // Handle authentication errors (e.g., invalid credentials)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials.");
        } catch (Exception e) {
            // Catch all other unexpected errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred: " + e.getMessage());
        }
    }


}
