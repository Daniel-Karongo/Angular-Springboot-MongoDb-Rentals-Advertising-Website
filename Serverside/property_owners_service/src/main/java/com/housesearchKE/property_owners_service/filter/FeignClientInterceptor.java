package com.housesearchKE.property_owners_service.filter;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.springframework.stereotype.Component;

@Component
public class FeignClientInterceptor implements RequestInterceptor {

    @Override
    public void apply(RequestTemplate template) {
        // Get the JWT token from the ThreadLocal variable
        String jwtToken = JWTForwardingFilter.getJwtToken();

        // If a JWT token is present, add it to the Authorization header
        if (jwtToken != null) {
            template.header("Authorization", "Bearer " + jwtToken);
        }
    }
}
