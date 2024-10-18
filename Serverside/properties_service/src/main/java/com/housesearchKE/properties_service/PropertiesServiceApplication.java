package com.housesearchKE.properties_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class PropertiesServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(PropertiesServiceApplication.class, args);
	}

}
