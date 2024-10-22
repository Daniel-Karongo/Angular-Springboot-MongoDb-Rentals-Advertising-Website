package com.housesearchKE.api_gateway_service.service;

import com.housesearchKE.api_gateway_service.model.PropertyOwner;
import com.housesearchKE.api_gateway_service.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    public String verifyUser(PropertyOwner user) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmailAddress(), user.getPassword()));
        // This will check the user against the database as earlier configured

        if(authentication.isAuthenticated()) {
            return jwtService.generateToken(user.getEmailAddress());
        } else {
            return "Fail";
        }
    }
}
