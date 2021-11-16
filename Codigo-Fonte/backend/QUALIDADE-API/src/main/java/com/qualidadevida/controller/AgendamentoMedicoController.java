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

import com.qualidadevida.dto.AgendamentoMedicoDTO;
import com.qualidadevida.service.AgendamentoMedicoService;

@RestController
@RequestMapping("/agendamento-medico")
public class AgendamentoMedicoController {

	@Autowired
	private AgendamentoMedicoService service;

	@GetMapping("/pesquisar/{cpf}")
	public ResponseEntity<?> pesquisar(@PathVariable(required = true) String cpf) {
		return ResponseEntity.status(HttpStatus.OK).body(service.pesquisar(cpf));
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> consultarPorId(@PathVariable(required = true) Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(service.consultarPorId(id));
	}

	@GetMapping("/listarUSB")
	public ResponseEntity<?> listarUBS() {
		return ResponseEntity.status(HttpStatus.OK).body(service.listarUBS());
	}

	@PostMapping
	public ResponseEntity<?> salvarAgendamento(@RequestBody AgendamentoMedicoDTO agendamentoDTO) {
		AgendamentoMedicoDTO dto = service.salvarAgendamento(agendamentoDTO);
		return ResponseEntity.status(HttpStatus.CREATED).body(dto);
	}

	@PutMapping
	public ResponseEntity<?> alterar(@RequestBody AgendamentoMedicoDTO agendamentoDTO) {
		AgendamentoMedicoDTO dto = service.alterar(agendamentoDTO);
		return ResponseEntity.ok(dto);
	}

	@DeleteMapping("/{idAgendamento}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void excluir(@PathVariable(required = true) Long idAgendamento) {
		service.excluir(idAgendamento);
	}

}
