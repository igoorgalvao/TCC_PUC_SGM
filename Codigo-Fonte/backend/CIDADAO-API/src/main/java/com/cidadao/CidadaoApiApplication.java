package com.cidadao;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class CidadaoApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(CidadaoApiApplication.class, args);
	}

}
