package com.qualidadevida.service;

import java.util.List;
import java.util.Optional;

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

import com.qualidadevida.client.sasci.dto.UnidadeBasicaSaudeDTO;
import com.qualidadevida.core.BusinessException;
import com.qualidadevida.entidade.UnidadeBasicaSaude;
import com.qualidadevida.mapper.UnidadeBasicaSaudeMapper;
import com.qualidadevida.repository.UnidadeBasicaSaudeDAO;

@Service
@Transactional(readOnly = true)
public class UnidadeBasicaSaudeService {

	Logger logger = LoggerFactory.getLogger(UnidadeBasicaSaudeService.class);

	@Autowired
	private MessageSource messageSource;
	@Autowired
	private UnidadeBasicaSaudeDAO repository;
	@Autowired
	private UnidadeBasicaSaudeMapper mapper;

	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public UnidadeBasicaSaudeDTO salvar(UnidadeBasicaSaudeDTO dto) {
		validacao(dto);

		repository.save(mapper.toEntity(dto));

		return dto;
	}

	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public UnidadeBasicaSaudeDTO alterar(UnidadeBasicaSaudeDTO dto) {
		validacao(dto, dto.getId());

		repository.save(mapper.toEntity(dto));

		return dto;
	}

	@Transactional(propagation = Propagation.REQUIRED, readOnly = false)
	public void excluir(Long id) {

		if (id == null) {
			throw new BusinessException(
					messageSource.getMessage("mensagem.campo.obrigatorio", new Object[] { "ID" }, LocaleContextHolder.getLocale()));
		}

		repository.deleteById(id);
	}

	@Transactional(propagation = Propagation.REQUIRED, readOnly = true)
	public List<UnidadeBasicaSaudeDTO> pesquisar(UnidadeBasicaSaudeDTO dto) {
		return mapper.toDto(StringUtils.isNotBlank(dto.getNome()) ? repository.pesquisarPorNome(dto.getNome().toLowerCase().trim())
				: repository.findAll(Sort.by(Sort.Direction.ASC, "nome")));
	}

	@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
	public UnidadeBasicaSaudeDTO consultarPorId(Long id) {

		UnidadeBasicaSaudeDTO dto = mapper.toDto(repository.getOne(id));

		return dto;
	}

	private void validacao(UnidadeBasicaSaudeDTO dto, Long id) {
		if (id == null) {
			throw new BusinessException(
					messageSource.getMessage("mensagem.campo.obrigatorio", new Object[] { "Id" }, LocaleContextHolder.getLocale()));
		}

		validacao(dto);
	}

	private void validacao(UnidadeBasicaSaudeDTO dto) {

		if (StringUtils.isBlank(dto.getNome())) {
			throw new BusinessException(
					messageSource.getMessage("mensagem.campo.obrigatorio", new Object[] { "Nome" }, LocaleContextHolder.getLocale()));
		}

		if (StringUtils.isBlank(dto.getEndereco())) {
			throw new BusinessException(messageSource.getMessage("mensagem.campo.obrigatorio", new Object[] { "Unidade Básica de Saúde" },
					LocaleContextHolder.getLocale()));
		}

		if (dto.getId() == null) {
			UnidadeBasicaSaude entity = repository.findByNome(dto.getNome().trim());
			if (entity != null) {
				throw new BusinessException(messageSource.getMessage("mensagem.ubs.existe", new Object[] { "Id" }, LocaleContextHolder.getLocale()));
			}

		} else {
			UnidadeBasicaSaude entity = repository.findByNomeAndIdNotIn(dto.getNome(), dto.getId());
			if (entity != null) {
				throw new BusinessException(messageSource.getMessage("mensagem.ubs.existe", new Object[] { "Id" }, LocaleContextHolder.getLocale()));
			}
		}

	}

}
