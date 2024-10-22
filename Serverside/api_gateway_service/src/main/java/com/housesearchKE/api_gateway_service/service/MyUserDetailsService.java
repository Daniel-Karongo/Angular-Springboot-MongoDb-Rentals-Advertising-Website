package com.housesearchKE.api_gateway_service.service;

import com.housesearchKE.api_gateway_service.model.PropertyOwner;
import com.housesearchKE.api_gateway_service.model.UserPrincipal;
import com.housesearchKE.api_gateway_service.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        PropertyOwner user = userRepository.findByEmailAddress(username);
        System.out.println(user);
        if(user == null) {
            System.out.println("User is null");
            throw new UsernameNotFoundException("User 404: Not Found");
        } else {
            return new UserPrincipal(user);
        }
    }
}

