package com.qualidadevida.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import com.qualidadevida.dto.AgendamentoMedicoDTO;
import com.qualidadevida.entidade.AgendamentoMedico;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AgendamentoMapper extends BaseMapper<AgendamentoMedico, AgendamentoMedicoDTO> {

	
}
