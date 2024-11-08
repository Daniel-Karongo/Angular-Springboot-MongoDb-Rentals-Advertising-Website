package com.housesearchKE.api_gateway_service.config;

import com.housesearchKE.api_gateway_service.filter.JWTFilter;
import com.housesearchKE.api_gateway_service.service.MyUserDetailsService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.proxy.NoOp;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
//@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    private MyUserDetailsService userDetailsService;

    @Autowired
    private JWTFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())  // Disable CSRF for simplicity in APIs
                .authorizeHttpRequests(request -> request
                        .requestMatchers("/api/login", "/register", "/login", "/users", "/user").permitAll()  // Permit login/register pages

                        // Allow all GET requests without authentication
                        .requestMatchers(HttpMethod.GET, "/properties/**", "/owners/**").permitAll()

                        // Allow POST requests for specific paths to require authentication
                        .requestMatchers(HttpMethod.POST, "/properties/**", "/owners/**").authenticated()

                        .anyRequest().authenticated()  // Protect all other endpoints
                )
//                .formLogin(formLogin -> formLogin
//                        .permitAll()  // Use default login page for browsers
//                )
//                .formLogin().disable()
                .httpBasic(Customizer.withDefaults())  // Allow HTTP Basic for API login
//                .oauth2Login(Customizer.withDefaults())  // OAuth2 login for external providers
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(oauth2AuthenticationSuccessHandler())
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationSuccessHandler oauth2AuthenticationSuccessHandler() {
        return (request, response, authentication) -> {
//            // Prepare the response object (message or token, depending on your needs)
//            String responseMessage = "OAuth login successful!";  // You can customize this message or send additional info
//
//            // Return the message as a JSON response
//            response.setStatus(HttpServletResponse.SC_OK);
//            response.setContentType("application/json");
            response.sendRedirect("http://localhost:4200/profile");
        };
    }




    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(bCryptPasswordEncoder());
//        provider.setPasswordEncoder(NoOpPasswordEncoder.getInstance());

        return provider;
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder(12);
    }
}
