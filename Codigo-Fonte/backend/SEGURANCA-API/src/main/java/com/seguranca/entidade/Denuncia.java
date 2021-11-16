package com.seguranca.entidade;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.RequiredArgsConstructor;

@Entity
@Table(name = "DENUNCIA")
@Data
@Builder(builderClassName = "Builder")
@EqualsAndHashCode
@AllArgsConstructor
@RequiredArgsConstructor
public class Denuncia {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_DENUNCIA")
	private Long id;

	@Column(name = "ENDERECO_OCORRENCIA")
	private String enderecoOcorrencia;

	@Column(name = "DESCRICAO")
	private String descricao;

	@javax.persistence.ManyToOne(fetch = FetchType.LAZY)
	@javax.persistence.JoinColumn(name = "ID_TIPO_DENUNCIA", referencedColumnName = "ID_TIPO_DENUNCIA")
	private TipoDenuncia tipoDenuncia;

}