package com.legado.sasci.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.legado.sasci.dto.FichaSusDTO;
import com.legado.sasci.mock.CriadorFichaSusMock;

@RestController
@RequestMapping("/sasci")
public class SasciController {

	@RequestMapping(value = "/obterFichaSus/{cpf}", method = RequestMethod.GET)
	public FichaSusDTO obterFichaSus(@PathVariable String cpf) {
		return CriadorFichaSusMock.criarMock(cpf);
	}

}
