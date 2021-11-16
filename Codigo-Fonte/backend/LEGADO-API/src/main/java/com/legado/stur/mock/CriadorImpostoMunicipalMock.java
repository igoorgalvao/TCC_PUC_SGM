package com.legado.stur.mock;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

import org.springframework.web.bind.annotation.PathVariable;

import com.legado.stur.dto.ImpostoMunicipalDTO;
import com.legado.stur.dto.PagadorDTO;
import com.legado.stur.dto.TipoPessoaDTO;
import com.legado.stur.enums.TipoPessoaEnum;

public class CriadorImpostoMunicipalMock {

	public static ImpostoMunicipalDTO criarMock(String cpfCnpj, Long tipoPessoa, Long cep, String numero) {

		LocalDate dataVencimento = LocalDate.now();
		dataVencimento = dataVencimento.plusDays(5);

		// @formatter:off
		return ImpostoMunicipalDTO.builder()
									.id(1l)
									.cep(cep)
									.numero(numero)
									.valorMulta(new BigDecimal("300.50"))
									.valorDocumento(new BigDecimal("1500.99"))
									.dataVencimento(Date.from(dataVencimento.atStartOfDay(ZoneId.systemDefault()).toInstant()))
									.dataGeracao(new Date())
									.pagador(PagadorDTO.builder()
											.id(1l)
											.cpfCnpj(Long.valueOf(cpfCnpj))
											.nomePagador("João de Sousa")
											.tipoPessoa(TipoPessoaDTO.builder()
														.id(TipoPessoaEnum.obterEnum(tipoPessoa).getId())
														.nome(TipoPessoaEnum.obterEnum(tipoPessoa).getDescricao())
														.build())
											.build())
									.build();
		// @formatter:on

	}

}
