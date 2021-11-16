package com.qualidadevida.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.qualidadevida.entidade.AgendamentoMedico;

public interface AgendamentoMedicoDAO extends JpaRepository<AgendamentoMedico, Long> {

	List<AgendamentoMedico> findByCpf(String cpf);

}
