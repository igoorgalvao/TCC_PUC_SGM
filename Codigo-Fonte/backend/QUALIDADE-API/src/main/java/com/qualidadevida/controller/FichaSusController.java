package com.qualidadevida.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.qualidadevida.client.sasci.dto.FichaSusDTO;
import com.qualidadevida.service.client.SasciClientService;

@RestController
@RequestMapping("/fichaSus")
public class FichaSusController {

	@Autowired
	private SasciClientService sasciClientService;

	@GetMapping("/obterFichaSus/{cpf}")
	public FichaSusDTO obterFichaSus(@PathVariable String cpf) {
		return sasciClientService.obterFichaSusClintSasci(cpf.replaceAll("\\D+", ""));
	}

}
