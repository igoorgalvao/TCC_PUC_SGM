import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { SessaoService } from 'src/app/service/sessao.service';


@Directive({
	selector: '[appPermissao]'
})
export class PermissaoDirective {
	constructor(
		private sessaoService: SessaoService,
		private templateRef: TemplateRef<any>,
		private viewContainer: ViewContainerRef,
	) { }

	@Input() set appPermissao(roles: string[]) {

		if (roles) {
			let temPermissao = this.sessaoService.possuiPermissaoTelas(roles);

			if (temPermissao) {
				this.viewContainer.createEmbeddedView(this.templateRef);
			} else {
				this.viewContainer.clear();
			}
		} else {
			this.viewContainer.clear();
		}
	}
}
