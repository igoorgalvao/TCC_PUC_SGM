package com.seguranca.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seguranca.dto.DenunciaDTO;
import com.seguranca.service.DenunciaService;

@RestController
@RequestMapping("/denuncia")
public class DenunciaController {

	@Autowired
	private DenunciaService service;

	@PostMapping
	public ResponseEntity<?> salvar(@RequestBody DenunciaDTO denunciaDTO) {
		DenunciaDTO dto = service.salvar(denunciaDTO);
		return ResponseEntity.status(HttpStatus.CREATED).body(dto);
	}
	

	@GetMapping("/listarTipoDenuncia")
	public ResponseEntity<?> listarTipoDenuncia() {
		return ResponseEntity.status(HttpStatus.OK).body(service.listarTipoDenuncia());
	}

}
