package com.seguranca.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import com.seguranca.dto.TipoDenunciaDTO;
import com.seguranca.entidade.TipoDenuncia;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TipoDenunciaMapper extends BaseMapper<TipoDenuncia, TipoDenunciaDTO> {

}
