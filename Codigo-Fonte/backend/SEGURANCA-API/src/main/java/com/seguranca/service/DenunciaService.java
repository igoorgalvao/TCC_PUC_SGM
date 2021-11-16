package com.seguranca.service;

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

import com.seguranca.core.BusinessException;
import com.seguranca.dto.DenunciaDTO;
import com.seguranca.dto.TipoDenunciaDTO;
import com.seguranca.mapper.DenunciaMapper;
import com.seguranca.mapper.TipoDenunciaMapper;
import com.seguranca.repository.DenunciaDAO;
import com.seguranca.repository.TipoDenunciaDAO;

@Service
@Transactional(readOnly = true)
public class DenunciaService {

	Logger logger = LoggerFactory.getLogger(DenunciaService.class);

	@Autowired
	private MessageSource messageSource;

	@Autowired
	private DenunciaDAO repository;

	@Autowired
	private DenunciaMapper mapper;

	@Autowired
	private TipoDenunciaMapper tipoDenunciaMapper;

	@Autowired
	private TipoDenunciaDAO tipoDenunciarepository;

	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public DenunciaDTO salvar(DenunciaDTO dto) {
		validacao(dto);

		repository.save(mapper.toEntity(dto));

		return dto;
	}

	private void validacao(DenunciaDTO dto) {

		if (StringUtils.isBlank(dto.getEnderecoOcorrencia())) {
			throw new BusinessException(
					messageSource.getMessage("mensagem.campo.obrigatorio", new Object[] { "Endereço Ocorrência" }, LocaleContextHolder.getLocale()));
		}

		if (StringUtils.isBlank(dto.getDescricao())) {
			throw new BusinessException(
					messageSource.getMessage("mensagem.campo.obrigatorio", new Object[] { "Descrição" }, LocaleContextHolder.getLocale()));
		}

		if (dto.getTipoDenuncia() == null || dto.getTipoDenuncia().getId() == null) {
			throw new BusinessException(
					messageSource.getMessage("mensagem.campo.obrigatorio", new Object[] { "Tipo Denúncia" }, LocaleContextHolder.getLocale()));
		}

	}

	@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
	public List<TipoDenunciaDTO> listarTipoDenuncia() {
		return tipoDenunciaMapper.toDto(tipoDenunciarepository.findAll(Sort.by(Sort.Direction.ASC, "descricao")));
	}

}
