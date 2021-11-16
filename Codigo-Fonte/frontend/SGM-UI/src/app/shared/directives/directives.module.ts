import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from '@angular/core';
import { PermissaoDirective } from "./permissao.directive";


const DIRECTIVES_COMPONENTS = [
	PermissaoDirective,
];

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: DIRECTIVES_COMPONENTS,
	exports: DIRECTIVES_COMPONENTS
})
export class DirectivesModule {
	static forRoot(): ModuleWithProviders<DirectivesModule> {
		return {
			ngModule: DirectivesModule
		};
	}
}
