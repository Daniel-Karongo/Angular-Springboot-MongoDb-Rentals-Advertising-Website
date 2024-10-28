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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

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
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmailAddress(), user.getPassword()));
        // This will check the user against the database as earlier configured

        if(authentication.isAuthenticated()) {
            String token = jwtService.generateToken(user.getEmailAddress());
            if (token != null) {
                // Set the JWT as an HTTP-only cookie
                Cookie cookie = new Cookie("token", token);
                cookie.setHttpOnly(true); // Prevents JavaScript access to the cookie
                cookie.setSecure(true);   // Use in production over HTTPS
                cookie.setPath("/");      // Make the cookie accessible on the entire site
                cookie.setMaxAge(43200);   // Set the cookie expiration (1 hour)

                // Add the cookie to the response
                response.addCookie(cookie);

                return ResponseEntity.ok("Login successful. Token: " + token);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed");
            }
        } else {
            return new ResponseEntity<>("Fail", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
