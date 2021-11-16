package com.cidadao.client.stur;

import java.net.URI;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.cidadao.client.ClientConfig;
import com.cidadao.client.stur.dto.ImpostoMunicipalDTO;

@FeignClient(url = "http://localhost:9095/legado-api/stur-imposto", name = "stur", fallback = ConsultaSturClientFallback.class, configuration = ClientConfig.class)
public interface ConsultaSturClient {

	@GetMapping("/obterImposto/{cpfCnpj}/{tipoPessoa}/{cep}/{numero}")
	ImpostoMunicipalDTO obterImpostoMunicipal(URI baseUrl, @PathVariable("cpfCnpj") String cpfCnpj, @PathVariable("tipoPessoa") Long tipoPessoa,
			@PathVariable("cep") Long cep, @PathVariable("numero") String numero);
}
