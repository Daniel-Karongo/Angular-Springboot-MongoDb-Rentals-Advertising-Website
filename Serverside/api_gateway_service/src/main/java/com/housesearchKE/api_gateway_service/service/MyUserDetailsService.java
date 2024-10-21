package com.housesearchKE.SpringbootSecurityExample.service;

import com.housesearchKE.SpringbootSecurityExample.model.User;
import com.housesearchKE.SpringbootSecurityExample.model.UserPrincipal;
import com.housesearchKE.SpringbootSecurityExample.repo.UserRepository;
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
        User user = userRepository.findByUsername(username);
        System.out.println(user);
        if(user == null) {
            System.out.println("User is null");
            throw new UsernameNotFoundException("User 404: Not Found");
        } else {
            return new UserPrincipal(user);
        }
    }
}

