package com.seguranca.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.seguranca.dto.TesteDTO;
import com.seguranca.repository.TesteDAO;

@Service
@Transactional(readOnly = true)
public class TesteService {

	@Autowired
	private TesteDAO dao;

	@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
	public List<TesteDTO> listar() {
		return dao.findAll().stream().map(item ->

		// @formatter:off
			TesteDTO.builder()
			.id(item.getId())
			.texto(item.getTexto())
			.build()
		// @formatter:on

		).collect(Collectors.toList());
	}

}
