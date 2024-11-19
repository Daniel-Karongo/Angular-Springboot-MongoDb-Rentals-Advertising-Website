package com.housesearchKE.property_owners_service.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JWTForwardingFilter extends OncePerRequestFilter {

    private static final ThreadLocal<String> jwtTokenHolder = new ThreadLocal<>();

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
        System.out.println("authHeader: " + authHeader);

        // If the token exists and starts with "Bearer ", store it in the ThreadLocal
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String jwtToken = authHeader.substring(7); // Remove "Bearer " prefix
            jwtTokenHolder.set(jwtToken); // Store the token in ThreadLocal
        }

        try {
            // Continue the filter chain
            filterChain.doFilter(request, response);
        } finally {
            // Clear the ThreadLocal variable
            jwtTokenHolder.remove();
        }
    }

    public static String getJwtToken() {
        return jwtTokenHolder.get();
    }
}