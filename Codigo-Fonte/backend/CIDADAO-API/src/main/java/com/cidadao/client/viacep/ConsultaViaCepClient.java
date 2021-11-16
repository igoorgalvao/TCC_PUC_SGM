package com.cidadao.client.viacep;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.cidadao.client.ClientConfig;
import com.cidadao.client.viacep.dto.EnderecoDTO;

@FeignClient(url = "https://viacep.com.br/ws/", name = "viacep", fallback = ConsultaViaCepClientFallback.class, configuration = ClientConfig.class)
public interface ConsultaViaCepClient {

	@GetMapping("{cep}/json")
	EnderecoDTO obterEnderecoPorCep(@PathVariable("cep") String cep);
}
