package com.qualidadevida.service.client;

import java.net.URI;
import java.text.SimpleDateFormat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

import com.qualidadevida.client.sasci.ConsultaSasciClient;
import com.qualidadevida.client.sasci.dto.FichaSusDTO;
import com.qualidadevida.core.BusinessException;

@Service
public class SasciClientService {

	@Autowired
	private MessageSource messageSource;

	@Autowired
	private ConsultaSasciClient clientSasci;

	@Value("${sasci.client}")
	private String urlSasciClient;

	public FichaSusDTO obterFichaSusClintSasci(String cpf) {
		FichaSusDTO fichaSusDTO = null;
		try {
			URI urlStur = URI.create(urlSasciClient);
			fichaSusDTO = clientSasci.obterFichaSus(urlStur, cpf);
			fichaSusDTO.setDataNascimentoFormat(new SimpleDateFormat("dd/MM/yyyy").format(fichaSusDTO.getDataNascimento()));
		} catch (Exception e) {
			throw new BusinessException(messageSource.getMessage("sasci.offline", null, LocaleContextHolder.getLocale()));
		}

		return fichaSusDTO;
	}

}
