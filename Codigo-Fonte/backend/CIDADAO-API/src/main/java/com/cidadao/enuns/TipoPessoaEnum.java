package com.cidadao.enuns;

import lombok.Getter;

@Getter
public enum TipoPessoaEnum {

	FISICA(1l), JURIDICA(2l), RURAL(3l);

	private final Long id;

	TipoPessoaEnum(Long id) {
		this.id = id;
	}

}
