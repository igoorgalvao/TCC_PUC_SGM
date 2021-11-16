package com.qualidadevida.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import com.qualidadevida.client.sasci.dto.UnidadeBasicaSaudeDTO;
import com.qualidadevida.entidade.UnidadeBasicaSaude;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UnidadeBasicaSaudeMapper extends BaseMapper<UnidadeBasicaSaude, UnidadeBasicaSaudeDTO> {

}
