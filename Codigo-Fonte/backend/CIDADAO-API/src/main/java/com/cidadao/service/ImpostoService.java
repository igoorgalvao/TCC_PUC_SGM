package com.cidadao.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.apache.commons.lang3.math.NumberUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.cidadao.client.stur.dto.ImpostoMunicipalDTO;
import com.cidadao.dto.BoletoImpostoDTO;
import com.cidadao.dto.DownloadFileDTO;
import com.cidadao.dto.GerarImpostoDTO;
import com.cidadao.entidade.HistoricoGeracaoImposto;
import com.cidadao.enuns.TipoPessoaEnum;
import com.cidadao.repository.HistoricoGeracaoImpostoDAO;
import com.cidadao.service.client.SturClientService;

import net.sf.jasperreports.engine.JRParameter;

@Service
@Transactional(readOnly = true)
public class ImpostoService {

	Logger logger = LoggerFactory.getLogger(ImpostoService.class);

	@Autowired
	private HistoricoGeracaoImpostoDAO historicoGeracaoImpostoDAO;
	@Autowired
	private RelatorioService relatorioService;
	@Autowired
	private SturClientService sturClientService;

	@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
	public DownloadFileDTO gerarImposto(GerarImpostoDTO gerarImpostoDTO) {
		DownloadFileDTO dto = new DownloadFileDTO();

		String cep = gerarImpostoDTO.getCep().replaceAll("\\D+", "");
		String cpfCnpj = gerarImpostoDTO.getCpfCnpj().replaceAll("\\D+", "");

		ImpostoMunicipalDTO impostoMunicipal = sturClientService.obterImpostoMunicipal(cpfCnpj, gerarImpostoDTO.getTipoPessoa(), Long.valueOf(cep),
				gerarImpostoDTO.getNumero());

		List<BoletoImpostoDTO> lista = new ArrayList<>();

		// @formatter:off
		lista.add(BoletoImpostoDTO.builder()
				.pagador(impostoMunicipal.getPagador().getNomePagador())
				.cep(impostoMunicipal.getCep().toString())
				.dataGeracao(new SimpleDateFormat("dd/MM/yyyy").format(impostoMunicipal.getDataGeracao()))
				.dataVencimento(new SimpleDateFormat("dd/MM/yyyy").format(impostoMunicipal.getDataVencimento()))
				.multa(impostoMunicipal.getValorMulta())
				.valor(impostoMunicipal.getValorDocumento())
				.build());
		// @formatter:on

		Map<String, Object> parametros = new HashMap<>();
		parametros.put(JRParameter.REPORT_LOCALE, new Locale("pt", "BR"));

		byte[] bytes = null;
		if (gerarImpostoDTO.getTipoPessoa().equals(TipoPessoaEnum.RURAL.getId())) {
			bytes = relatorioService.gerarRelatorioPdf("/relatorios/boleto-itr.jasper", parametros, lista);
		} else {
			bytes = relatorioService.gerarRelatorioPdf("/relatorios/iptu.jasper", parametros, lista);
		}
		dto.setBytes(bytes);

		// @formatter:off
		HistoricoGeracaoImposto hstSave = HistoricoGeracaoImposto.builder()
											.idImpostoMunicipal(impostoMunicipal.getId())
											.usuarioAcesso(gerarImpostoDTO.getUsuarioAcesso())
											.dataGeracao(new Date())
											.documentoGerado(bytes)
											.build();
		// @formatter:on\s

		/* Salva historico de geração de documento */
		historicoGeracaoImpostoDAO.save(hstSave);

		return dto;

	}

}
