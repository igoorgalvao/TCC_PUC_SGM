package com.seguranca.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seguranca.entidade.Teste;

public interface TesteDAO extends JpaRepository<Teste, Long> {

}
