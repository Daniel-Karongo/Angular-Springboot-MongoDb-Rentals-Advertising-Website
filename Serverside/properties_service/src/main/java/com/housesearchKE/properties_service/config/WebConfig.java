//package com.housesearchKE.properties_service.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//public class WebConfig implements WebMvcConfigurer {
//
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")  // Allow all paths
//                .allowedOrigins("http://localhost:4200")  // Allow requests from any origin
////                .allowedOrigins("*")  // Allow requests from any origin
//                .allowedMethods("GET", "POST", "PUT", "DELETE")  // Allow specific HTTP methods
//                .allowedHeaders("*")  // Allow all headers
//                .allowCredentials(true);  // Allow cookies, if needed
////                .allowCredentials(false);  // Allow cookies, if needed
//    }
//}