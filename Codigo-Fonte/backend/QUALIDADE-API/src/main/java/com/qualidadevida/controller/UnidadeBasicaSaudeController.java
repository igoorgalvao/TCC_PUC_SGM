package com.qualidadevida.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.qualidadevida.client.sasci.dto.UnidadeBasicaSaudeDTO;
import com.qualidadevida.service.UnidadeBasicaSaudeService;

@RestController
@RequestMapping("/unidade-basica-saude")
public class UnidadeBasicaSaudeController {

	@Autowired
	private UnidadeBasicaSaudeService service;

	@PostMapping("/pesquisar")
	public ResponseEntity<?> pesquisar(@RequestBody UnidadeBasicaSaudeDTO unidadeDTO) {
		return ResponseEntity.status(HttpStatus.OK).body(service.pesquisar(unidadeDTO));
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> consultarPorId(@PathVariable(required = true) Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(service.consultarPorId(id));
	}

	@PostMapping
	public ResponseEntity<?> salvar(@RequestBody UnidadeBasicaSaudeDTO unidadeDTO) {
		UnidadeBasicaSaudeDTO dto = service.salvar(unidadeDTO);
		return ResponseEntity.status(HttpStatus.CREATED).body(dto);
	}

	@PutMapping
	public ResponseEntity<?> alterar(@RequestBody UnidadeBasicaSaudeDTO unidadeDTO) {
		UnidadeBasicaSaudeDTO dto = service.alterar(unidadeDTO);
		return ResponseEntity.ok(dto);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void excluir(@PathVariable(required = true) Long id) {
		service.excluir(id);
	}

}
