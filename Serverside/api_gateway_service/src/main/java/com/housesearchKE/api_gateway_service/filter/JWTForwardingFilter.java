package com.housesearchKE.api_gateway_service.filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@Component
public class JWTForwardingFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

//        if ("GET".equalsIgnoreCase(request.getMethod())) {
//            System.out.println("Get request. No authentication needed");
//            filterChain.doFilter(request, response);
//            return;
//        }

        // Extract the JWT token from the Authorization header
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String jwtToken = authHeader.substring(7); // Remove "Bearer " prefix

            // Forward the JWT token as an Authorization header to downstream services
            response.setHeader("Authorization", "Bearer " + jwtToken);
        }

        // Continue the filter chain
        filterChain.doFilter(request, response);
    }
}
