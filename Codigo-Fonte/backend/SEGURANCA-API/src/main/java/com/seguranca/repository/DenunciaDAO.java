package com.seguranca.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.seguranca.entidade.Denuncia;

public interface DenunciaDAO extends JpaRepository<Denuncia, Long> {

}
