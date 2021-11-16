package com.qualidadevida.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.qualidadevida.entidade.UnidadeBasicaSaude;

public interface UnidadeBasicaSaudeDAO extends JpaRepository<UnidadeBasicaSaude, Long> {

	@Query(" SELECT UNI FROM UnidadeBasicaSaude UNI                                    "
			+ " WHERE lower(UNI.nome) like CONCAT('%',:nome,'%')                       "
			+ " ORDER BY UNI.nome ASC                                                  ")
	@Transactional(readOnly = true)
	List<UnidadeBasicaSaude> pesquisarPorNome(@Param("nome") String nome);

	@Query(" SELECT UNI FROM UnidadeBasicaSaude UNI                                    "
			+ " WHERE lower(UNI.nome) = lower(:nome)                                   ")
	@Transactional(readOnly = true)
	UnidadeBasicaSaude findByNome(@Param("nome") String nome);

	@Query(" SELECT UNI FROM UnidadeBasicaSaude UNI                                    "
			+ " WHERE lower(UNI.nome) = lower(:nome)                                   "
			+ " AND   UNI.id != :id                                                    ")
	@Transactional(readOnly = true)
	UnidadeBasicaSaude findByNomeAndIdNotIn(@Param("nome") String nome, @Param("id") Long id);

}
