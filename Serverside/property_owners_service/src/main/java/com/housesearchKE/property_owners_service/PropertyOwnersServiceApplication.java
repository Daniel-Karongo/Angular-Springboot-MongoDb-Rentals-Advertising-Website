package com.housesearchKE.property_owners_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class PropertyOwnersServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(PropertyOwnersServiceApplication.class, args);
	}

}
