package com.qualidadevida.service;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.qualidadevida.client.sasci.dto.FichaSusDTO;
import com.qualidadevida.client.sasci.dto.UnidadeBasicaSaudeDTO;
import com.qualidadevida.core.BusinessException;
import com.qualidadevida.dto.AgendamentoMedicoDTO;
import com.qualidadevida.entidade.AgendamentoMedico;
import com.qualidadevida.mapper.AgendamentoMapper;
import com.qualidadevida.mapper.UnidadeBasicaSaudeMapper;
import com.qualidadevida.repository.AgendamentoMedicoDAO;
import com.qualidadevida.repository.UnidadeBasicaSaudeDAO;
import com.qualidadevida.service.client.SasciClientService;

@Service
@Transactional(readOnly = true)
public class AgendamentoMedicoService {

	Logger logger = LoggerFactory.getLogger(AgendamentoMedicoService.class);

	@Autowired
	private MessageSource messageSource;
	@Autowired
	private AgendamentoMedicoDAO repository;
	@Autowired
	private UnidadeBasicaSaudeDAO unidadeRepository;
	@Autowired
	private SasciClientService sasciClientService;

	@Autowired
	private AgendamentoMapper mapper;
	@Autowired
	private UnidadeBasicaSaudeMapper unidadeMapper;

	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public AgendamentoMedicoDTO salvarAgendamento(AgendamentoMedicoDTO dto) {
		validacao(dto);

		FichaSusDTO fichaSusDTO = sasciClientService.obterFichaSusClintSasci(dto.getCpf());
		dto.setIdFichaSus(fichaSusDTO.getId());
		dto.setCpf(dto.getCpf().replaceAll("\\D+", ""));
		AgendamentoMedico entity = repository.save(mapper.toEntity(dto));

		return mapper.toDto(entity);
	}

	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public AgendamentoMedicoDTO alterar(AgendamentoMedicoDTO dto) {
		validacao(dto, dto.getId());

		FichaSusDTO fichaSusDTO = sasciClientService.obterFichaSusClintSasci(dto.getCpf());
		dto.setIdFichaSus(fichaSusDTO.getId());
		dto.setCpf(dto.getCpf().replaceAll("\\D+", ""));

		AgendamentoMedico entity = repository.save(mapper.toEntity(dto));

		return mapper.toDto(entity);
	}

	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void excluir(Long idAgendamento) {

		if (idAgendamento == null) {
			throw new BusinessException(
					messageSource.getMessage("mensagem.campo.obrigatorio", new Object[] { "ID Agendamento" }, LocaleContextHolder.getLocale()));
		}

		repository.deleteById(idAgendamento);
	}

	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	public List<AgendamentoMedicoDTO> pesquisar(String cpf) {
		return mapper.toDto(repository.findByCpf(cpf.replaceAll("\\D+", "")));
	}

	@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
	public AgendamentoMedicoDTO consultarPorId(Long id) {

		AgendamentoMedicoDTO dto = mapper.toDto(repository.getOne(id));

		FichaSusDTO fichaSusDTO = sasciClientService.obterFichaSusClintSasci(dto.getCpf());
		dto.setIdFichaSus(fichaSusDTO.getId());
		dto.setFichaSus(fichaSusDTO);

		return dto;
	}

	@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
	public List<UnidadeBasicaSaudeDTO> listarUBS() {
		return unidadeMapper.toDto(unidadeRepository.findAll(Sort.by(Sort.Direction.ASC, "nome")));
	}

	private void validacao(AgendamentoMedicoDTO dto, Long id) {
		if (id == null) {
			throw new BusinessException(
					messageSource.getMessage("mensagem.campo.obrigatorio", new Object[] { "Id" }, LocaleContextHolder.getLocale()));
		}

		validacao(dto);
	}

	private void validacao(AgendamentoMedicoDTO dto) {

		if (StringUtils.isBlank(dto.getCpf())) {
			throw new BusinessException(
					messageSource.getMessage("mensagem.campo.obrigatorio", new Object[] { "CPF" }, LocaleContextHolder.getLocale()));
		}

		if (dto.getIdUbs() == null) {
			throw new BusinessException(messageSource.getMessage("mensagem.campo.obrigatorio", new Object[] { "Unidade Básica de Saúde" },
					LocaleContextHolder.getLocale()));
		}

		if (dto.getDataHoraAgendamento() == null) {
			throw new BusinessException(messageSource.getMessage("mensagem.campo.obrigatorio", new Object[] { "Data Hora da Consulta" },
					LocaleContextHolder.getLocale()));
		}

		if (StringUtils.isBlank(dto.getEspecialidade())) {
			throw new BusinessException(
					messageSource.getMessage("mensagem.campo.obrigatorio", new Object[] { "Especialidade" }, LocaleContextHolder.getLocale()));
		}
	}

}
