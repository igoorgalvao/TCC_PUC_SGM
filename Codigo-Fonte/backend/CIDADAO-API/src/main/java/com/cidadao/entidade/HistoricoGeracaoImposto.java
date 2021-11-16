package com.cidadao.entidade;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
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
@Table(name = "HST_GERACAO_IMPOSTO")
@Data
@Builder
@EqualsAndHashCode
@AllArgsConstructor
@RequiredArgsConstructor
public class HistoricoGeracaoImposto {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID_HST_GERACAO_IMPOSTO")
	private Long id;

	@Column(name = "NU_IMPOSTO_MUNICIPAL")
	private Long idImpostoMunicipal;

	@Column(name = "NO_USUARIO")
	private String usuarioAcesso;

	@Temporal(TemporalType.TIMESTAMP)
	@javax.persistence.Column(name = "DT_GERACAO")
	private Date dataGeracao;

	@Column(name = "DOCUMENTO_GERADO", columnDefinition = "blob")
	private byte[] documentoGerado;

}
