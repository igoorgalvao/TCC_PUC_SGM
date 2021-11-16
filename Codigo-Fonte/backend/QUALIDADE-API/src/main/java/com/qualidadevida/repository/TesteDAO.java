package com.qualidadevida.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.qualidadevida.entidade.Teste;

public interface TesteDAO extends JpaRepository<Teste, Long> {

}
