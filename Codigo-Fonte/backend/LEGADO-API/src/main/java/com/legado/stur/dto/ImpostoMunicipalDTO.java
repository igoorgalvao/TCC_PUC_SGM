package com.legado.stur.dto;

import java.math.BigDecimal;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ImpostoMunicipalDTO {

	private Long id;
	private PagadorDTO pagador;
	private Long cep;
	private String numero;
	private BigDecimal valorDocumento;
	private BigDecimal valorMulta;
	private Date dataVencimento;
	private Date dataGeracao;

}
