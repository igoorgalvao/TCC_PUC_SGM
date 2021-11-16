package com.qualidadevida;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class QualidadevidaApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(QualidadevidaApiApplication.class, args);
	}

}
