package com.cidadao.dto;

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
public class GerarImpostoDTO {

	private Long tipoCpfCnpj;
	private Long tipoPessoa;

	private String cpfCnpj;
	private String endereco;
	private String cep;
	private String numero;

	private Long cpfCnpjSemMascara;
	private Long cepSemMascara;

	private String usuarioAcesso;
}
