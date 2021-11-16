package com.cidadao.service;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Service
@Transactional(readOnly = true)
public class RelatorioService {

	public byte[] gerarRelatorioPdf(String caminhoRelatorio, Map<String, Object> parametros, Collection<?> dados) {
		return gerarRelatorioPdf(caminhoRelatorio, parametros, dados, null);
	}

	public byte[] gerarRelatorioPdf(String caminhoRelatorio, Map<String, Object> parametros, Collection<?> dados, String nomeRelatorio) {
		JasperPrint print = null;
		try {
			print = gerarJasperPrint(caminhoRelatorio, parametros, gerarDataSource(dados));
			return JasperExportManager.exportReportToPdf(print);
		} catch (JRException e) {
			throw new UnsupportedOperationException("Falha ao gerar o relatorio", e);
		} catch (Exception e) {
			throw new UnsupportedOperationException("Falha ao gerar o relatorio", e);
		}
	}

	private static JasperPrint gerarJasperPrint(String caminhoRelatorio, Map<String, Object> parametros, JRDataSource dataSource) throws JRException {
		return JasperFillManager.fillReport(RelatorioService.class.getResourceAsStream(caminhoRelatorio),
				parametros != null ? parametros : new HashMap<>(), dataSource);
	}

	private static JRDataSource gerarDataSource(Collection dados) {
		return new JRBeanCollectionDataSource(dados);
	}
}
