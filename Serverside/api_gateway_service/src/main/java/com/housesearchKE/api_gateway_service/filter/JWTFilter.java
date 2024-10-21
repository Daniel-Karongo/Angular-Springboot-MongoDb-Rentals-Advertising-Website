package com.housesearchKE.SpringbootSecurityExample.filter;

import com.housesearchKE.SpringbootSecurityExample.service.JWTService;
import com.housesearchKE.SpringbootSecurityExample.service.MyUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JWTFilter extends OncePerRequestFilter {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private MyUserDetailsService myUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        String JWTtoken = null;
        String username = null;

        if(authHeader != null && authHeader.startsWith("Bearer ")) {
            JWTtoken = authHeader.substring(7);
            username = jwtService.extractUserName(JWTtoken);
        }

        if(username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//            UserDetails userDetails = context.getBean(MyUserDetailsService.class).loadUserByUsername(username);
            UserDetails userDetails = myUserDetailsService.loadUserByUsername(username);


            if(jwtService.validateToken(JWTtoken, userDetails)) {
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }
        filterChain.doFilter(request, response);

    }
}
