package com.seguranca.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import com.seguranca.dto.DenunciaDTO;
import com.seguranca.entidade.Denuncia;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface DenunciaMapper extends BaseMapper<Denuncia, DenunciaDTO> {

}
