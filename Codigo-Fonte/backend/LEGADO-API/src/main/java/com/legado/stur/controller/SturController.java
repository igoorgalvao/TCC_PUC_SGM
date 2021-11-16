package com.legado.stur.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.legado.stur.dto.ImpostoMunicipalDTO;
import com.legado.stur.mock.CriadorImpostoMunicipalMock;

@RestController
@RequestMapping("/stur-imposto")
public class SturController {

	@RequestMapping(value = "/obterImposto/{cpfCnpj}/{tipoPessoa}/{cep}/{numero}", method = RequestMethod.GET)
	public ImpostoMunicipalDTO obterImpostoMunicipal(@PathVariable String cpfCnpj, @PathVariable Long tipoPessoa, @PathVariable Long cep,
			@PathVariable String numero) {

		return CriadorImpostoMunicipalMock.criarMock(cpfCnpj, tipoPessoa, cep, numero);
	}

}
