package com.qualidadevida.dto;

import java.util.Date;

import com.qualidadevida.client.sasci.dto.FichaSusDTO;
import com.qualidadevida.client.sasci.dto.UnidadeBasicaSaudeDTO;

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
public class AgendamentoMedicoDTO {

	private Long id;
	private String cpf;
	private Long idFichaSus;
	private Date dataHoraAgendamento;
	private Long idUbs;
	private String especialidade;
	private FichaSusDTO FichaSus;
	private UnidadeBasicaSaudeDTO ubs;

}
