package com.qualidadevida.client.sasci;

import java.net.URI;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.qualidadevida.client.ClientConfig;
import com.qualidadevida.client.sasci.dto.FichaSusDTO;

@FeignClient(url = "http://localhost:9095/legado-api/sasci", name = "stur", fallback = ConsultaSasciClientFallback.class, configuration = ClientConfig.class)
public interface ConsultaSasciClient {

	@GetMapping("/obterFichaSus/{cpf}")
	FichaSusDTO obterFichaSus(URI baseUrl,@PathVariable("cpf") String cpf);
}
