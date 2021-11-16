package com.cidadao.service.client;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.cidadao.client.stur.ConsultaSturClient;
import com.cidadao.client.stur.dto.ImpostoMunicipalDTO;
import com.cidadao.core.BusinessException;

@Service
public class SturClientService {

	@Autowired
	private MessageSource messageSource;

	@Autowired
	private ConsultaSturClient clientStur;

	@Value("${stur.client}")
	private String urlSTURClient;

	public ImpostoMunicipalDTO obterImpostoMunicipal(String cpfCnpj, Long tipoPessoa, Long cep, String numero) {
		ImpostoMunicipalDTO impostoMunicipal = null;
		try {
			URI urlStur = URI.create(urlSTURClient);
			impostoMunicipal = clientStur.obterImpostoMunicipal(urlStur, cpfCnpj, tipoPessoa, cep, numero);
		} catch (Exception e) {
			throw new BusinessException(messageSource.getMessage("stur.offline", null, LocaleContextHolder.getLocale()));
		}

		return impostoMunicipal;
	}

}
