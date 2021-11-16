package com.cidadao.dto;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.RequiredArgsConstructor;

@Data
@Builder
@EqualsAndHashCode
@AllArgsConstructor
@RequiredArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class BoletoImpostoDTO {

	private String pagador;
	private String cep;
	private String dataGeracao;
	private String dataVencimento;
	private BigDecimal multa;
	private BigDecimal valor;

}
