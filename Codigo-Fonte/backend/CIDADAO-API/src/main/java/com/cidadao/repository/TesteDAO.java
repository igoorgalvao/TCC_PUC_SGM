package com.cidadao.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cidadao.entidade.Teste;

public interface TesteDAO extends JpaRepository<Teste, Long> {

}
