package com.seguranca.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seguranca.entidade.TipoDenuncia;

public interface TipoDenunciaDAO extends JpaRepository<TipoDenuncia, Long> {

}
