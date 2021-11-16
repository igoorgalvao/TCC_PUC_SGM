package com.cidadao.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cidadao.client.viacep.ConsultaViaCepClient;
import com.cidadao.client.viacep.dto.EnderecoDTO;

@RestController
@RequestMapping("/localidade")
public class LocalidadeController {

	@Autowired
	private ConsultaViaCepClient service;

	@GetMapping("/consultaPorCep/{cep}")
	public EnderecoDTO gerarImpostoPorTipoPessoa(@PathVariable String cep) {
		return service.obterEnderecoPorCep(cep);
	}

}
