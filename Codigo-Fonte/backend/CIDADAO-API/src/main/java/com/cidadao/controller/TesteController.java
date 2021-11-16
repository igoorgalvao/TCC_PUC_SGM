package com.cidadao.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cidadao.dto.TesteDTO;
import com.cidadao.service.TesteService;

@RestController
@RequestMapping("/teste")
public class TesteController {

	@Autowired
	private TesteService service;

	@GetMapping("/listar")
	public List<TesteDTO> listar() {
		return service.listar();
	}
}
