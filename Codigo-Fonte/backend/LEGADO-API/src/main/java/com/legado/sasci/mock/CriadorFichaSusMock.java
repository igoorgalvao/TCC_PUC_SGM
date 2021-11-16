package com.legado.sasci.mock;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

import com.legado.sasci.dto.FichaSusDTO;

public class CriadorFichaSusMock {

	public static FichaSusDTO criarMock(String cpf) {

		LocalDate dataNascimento = LocalDate.now().of(1988, 3, 23);

		// @formatter:off
		return FichaSusDTO.builder()
				.id(99914l)
				.cpf(cpf)
				.cartaoNacionalSaude("908604043402417")
				.dataNascimento(Date.from(dataNascimento.atStartOfDay(ZoneId.systemDefault()).toInstant()) )
				.endereco("Santa Efigênia Belo Horizonte - MG CEP: 30260-900")
				.nome("Luiz Barsi Filho")
				.build();
		// @formatter:on

	}

}
