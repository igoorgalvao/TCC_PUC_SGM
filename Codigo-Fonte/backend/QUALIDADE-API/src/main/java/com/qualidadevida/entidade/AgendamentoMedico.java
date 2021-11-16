package com.qualidadevida.entidade;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.RequiredArgsConstructor;

@Entity
@Table(name = "AGENDAMENTO_MEDICO")
@Data
@Builder
@EqualsAndHashCode
@AllArgsConstructor
@RequiredArgsConstructor
public class AgendamentoMedico {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_AGENDAMENTO")
	private Long id;

	@Column(name = "CPF")
	private String cpf;

	@Column(name = "NU_FICHA_SUS")
	private Long idFichaSus;

	@Column(name = "NU_UBS")
	private Long idUbs;

	@Column(name = "ESPECIALIDADE")
	private String especialidade;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "DATA_HORA_AGENDAMENTO")
	private Date dataHoraAgendamento;

	@javax.persistence.ManyToOne(fetch = FetchType.LAZY)
	@javax.persistence.JoinColumn(name = "NU_UBS", referencedColumnName = "ID_UNIDADE", insertable = false, updatable = false)
	private UnidadeBasicaSaude ubs;

}