import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/utility/auth.guard';
import { PermissaoGuard } from 'src/app/utility/permissao.guard';
import { ConsultarUnidadeBasicaSaudeComponent } from './consultar/consultar-unidade-basica-saude.component';
import { IncluirUnidadeBasicaSaudeComponent } from './incluir/incluir-unidade-basica-saude.component';

const routes: Routes = [
  {
    path: '',
    component: ConsultarUnidadeBasicaSaudeComponent,
    data: { acesso: 'SGM_FUNCIONARIO' },
    canActivate: [AuthGuard, PermissaoGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: 'consultar',
    component: ConsultarUnidadeBasicaSaudeComponent,
    data: { acesso: 'SGM_FUNCIONARIO' },
    canActivate: [AuthGuard, PermissaoGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: 'incluir',
    component: IncluirUnidadeBasicaSaudeComponent,
    data: { acesso: 'SGM_FUNCIONARIO' },
    canActivate: [AuthGuard, PermissaoGuard],
    canActivateChild: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnidadeBasicaSaudeRoutingModule {
}
