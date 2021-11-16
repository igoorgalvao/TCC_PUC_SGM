package com.qualidadevida.client.sasci.dto;

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
public class UnidadeBasicaSaudeDTO {

	private Long id;
	private String nome;
	private String endereco;

}
