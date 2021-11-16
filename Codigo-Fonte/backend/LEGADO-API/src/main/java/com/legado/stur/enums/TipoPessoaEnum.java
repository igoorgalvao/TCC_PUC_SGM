package com.legado.stur.enums;

import lombok.Getter;

@Getter
public enum TipoPessoaEnum {

	FISICA(1l, "Física"), JURIDICA(2l, "Jurídica"), RURAL(3l, "Rural");

	private final Long id;
	private final String descricao;

	TipoPessoaEnum(Long id, String descricao) {
		this.id = id;
		this.descricao = descricao;
	}

	public static TipoPessoaEnum obterEnum(Long id) {
		for (TipoPessoaEnum enu : TipoPessoaEnum.values()) {
			if (enu.getId().equals(id)) {
				return enu;
			}
		}

		return null;
	}

}
