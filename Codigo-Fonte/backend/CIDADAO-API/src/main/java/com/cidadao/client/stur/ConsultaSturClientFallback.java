package com.cidadao.client.stur;

import java.net.URI;

import org.springframework.stereotype.Component;

import com.cidadao.client.stur.dto.ImpostoMunicipalDTO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class ConsultaSturClientFallback implements ConsultaSturClient {

	@Override
	public ImpostoMunicipalDTO obterImpostoMunicipal(URI baseUrl, String cpfCnpj, Long tipoPessoa, Long cep, String numero) {
		log.warn("Método de fallback executado para ..obterImpostoMunicipal");
		return ImpostoMunicipalDTO.builder().fallback("Fallback").build();
	}
}
