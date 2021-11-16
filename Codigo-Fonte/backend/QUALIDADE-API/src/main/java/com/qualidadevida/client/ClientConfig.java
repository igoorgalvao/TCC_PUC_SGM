package com.qualidadevida.client;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import feign.Logger;
import feign.Request;
import feign.Retryer;

@Configuration
public class ClientConfig {

	private static final int CINCO_SEGUNDOS = 5000;

	@Bean
	Logger.Level feignLoggerLevel() {
		return Logger.Level.FULL;
	}

	@Bean
	public Request.Options options() {
		return new Request.Options(CINCO_SEGUNDOS, CINCO_SEGUNDOS);
	}

	@Bean
	public Retryer retryer() {
		return new Retryer.Default(1000L, 1000L, 3);
	}
}