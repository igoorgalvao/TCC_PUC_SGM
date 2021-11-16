package com.cidadao.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cidadao.dto.DownloadFileDTO;
import com.cidadao.dto.GerarImpostoDTO;
import com.cidadao.service.ImpostoService;

@RestController
@RequestMapping("/imposto")
public class ImpostoController {

	@Autowired
	private ImpostoService service;

	@PostMapping
	public ResponseEntity<?> gerarImposto(@RequestBody GerarImpostoDTO dto) {

		DownloadFileDTO dtoFile = service.gerarImposto(dto);

		Resource file = new ByteArrayResource(dtoFile.getBytes());

		// @formatter:off
		return ResponseEntity.ok()
				.body(file);
		// @formatter:on
	}

}
