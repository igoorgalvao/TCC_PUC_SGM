package com.qualidadevida.client.sasci;

import java.net.URI;

import org.springframework.stereotype.Component;

import com.qualidadevida.client.sasci.dto.FichaSusDTO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class ConsultaSasciClientFallback implements ConsultaSasciClient {

	@Override
	public FichaSusDTO obterFichaSus(URI baseUrl,String cep) {
		log.warn("Método de fallback executado para ..obterFichaSus");
		return FichaSusDTO.builder().fallback("Fallback").build();
	}
}
