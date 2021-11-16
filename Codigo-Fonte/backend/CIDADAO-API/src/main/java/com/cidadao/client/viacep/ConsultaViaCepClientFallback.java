package com.cidadao.client.viacep;

import org.springframework.stereotype.Component;

import com.cidadao.client.viacep.dto.EnderecoDTO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class ConsultaViaCepClientFallback implements ConsultaViaCepClient {

	@Override
	public EnderecoDTO obterEnderecoPorCep(String cep) {
		log.warn("Método de fallback executado para ..obterEnderecoPorCep");
		return EnderecoDTO.builder().fallback("Fallback").build();
	}
}
