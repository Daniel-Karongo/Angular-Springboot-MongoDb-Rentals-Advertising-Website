package com.housesearchKE.api_gateway_service.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JWTService {
    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expirationMs}")
    private Long expirationTimeMs;

//    public JWTService() {
//        try {
//            KeyGenerator keyGenerator = KeyGenerator.getInstance("HmacSHA256");
//            SecretKey sKey = keyGenerator.generateKey();
//            secretKey = Base64.getEncoder().encodeToString(sKey.getEncoded());
//        } catch (NoSuchAlgorithmException e) {
//            throw new RuntimeException(e);
//        }
//    }
    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();

        return Jwts.builder()
                .claims(claims)
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expirationTimeMs))    // The token will expire after 12 hours
                .signWith(getKey())
                .compact();
    }

    private SecretKey getKey() {
        byte[] keyInBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyInBytes);
    }

    public String extractUserName(String jwTtoken) {
        return extractClaim(jwTtoken, Claims::getSubject);
    }

    private <T>T extractClaim(String jwTtoken, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(jwTtoken);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String jwTtoken) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(jwTtoken)
                .getPayload();
    }

    public boolean validateToken(String jwTtoken, UserDetails userDetails) {
        final String username = extractUserName(jwTtoken);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(jwTtoken));
    }

    private boolean isTokenExpired(String jwTtoken) {
        return extractExpiration(jwTtoken).before(new Date());
    }

    private Date extractExpiration(String jwTtoken) {
        return extractClaim(jwTtoken, Claims::getExpiration);
    }
}
