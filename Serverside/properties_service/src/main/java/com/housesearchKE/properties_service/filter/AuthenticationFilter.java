package com.housesearchKE.properties_service.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.Date;

@Component
public class AuthenticationFilter implements Filter {

    // Load the JWT secret from the application.properties file
    @Value("${jwt.secret}")
    private String secretKey;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String authorizationHeader = httpRequest.getHeader("Authorization");


        // Extract the JWT token from the 'Authorization' header
        String token = null;
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            token = authorizationHeader.substring(7);  // Remove "Bearer " prefix
        }

        try {
            if (token != null && validateToken(token)) {
                chain.doFilter(request, response); // Allow the request to proceed
            } else {
                sendUnauthorizedResponse((HttpServletResponse) response, "Invalid JWT token");
            }
        } catch (SignatureException | ExpiredJwtException ex) {
            sendUnauthorizedResponse((HttpServletResponse) response, "Invalid or expired JWT token");
        }
    }

    // Validate the JWT token
    public boolean validateToken(String jwtToken) {
        try {
            // Extract claims to check token validity (signature and expiration)
            Claims claims = extractAllClaims(jwtToken);
            return !isTokenExpired(claims);
        } catch (Exception e) {
            return false;
        }
    }

    // Generate a SecretKey using the JWT secret
    private SecretKey getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // Extract all claims from the JWT token
    private Claims extractAllClaims(String jwtToken) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(jwtToken)
                .getBody();
    }

    // Check if the token has expired
    private boolean isTokenExpired(Claims claims) {
        return claims.getExpiration().before(new Date());
    }

    // Send unauthorized response if JWT is invalid or missing
    private void sendUnauthorizedResponse(HttpServletResponse response, String message) throws IOException {
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, message);
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Optional: Configuration logic (if needed)
    }

    @Override
    public void destroy() {
        // Optional: Cleanup logic (if needed)
    }
}
