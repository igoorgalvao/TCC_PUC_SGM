package com.legado.stur.dto;

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
public class PagadorDTO {

	private Long id;
	private Long cpfCnpj;
	private String nomePagador;
	private TipoPessoaDTO tipoPessoa;
}