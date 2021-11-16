package com.qualidadevida.client.sasci.dto;

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
public class FichaSusDTO {

	private Long id;
	private String nome;
	private String cpf;
	private String endereco;
	private String cartaoNacionalSaude;
	private Date dataNascimento;
	private String fallback;
	private String dataNascimentoFormat;

}
