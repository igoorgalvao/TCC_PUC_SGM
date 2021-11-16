import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './utility/auth.guard';
import { PermissaoGuard } from './utility/permissao.guard';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'home-login', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'gerar-imposto', loadChildren: () => import(`./modulo-cidadao/gerar-imposto/gerar-imposto.module`).then(m => m.GerarImpostoModule), canActivate: [AuthGuard] },
  { path: 'agendamento-medico', loadChildren: () => import(`./modulo-qualidade-vida/agendamento-medico/agendamento-medico.module`).then(m => m.AgendametoMedicoModule), canActivate: [AuthGuard] },
  { path: 'unidade-basica-saude', loadChildren: () => import(`./modulo-qualidade-vida/unidade-basica-saude/unidade-basica-saude.module`).then(m => m.UnidadeBasicaSaudeModule), canActivate: [AuthGuard, PermissaoGuard] },
  { path: 'denuncia', loadChildren: () => import(`./modulo-seguranca/denuncia/denuncia.module`).then(m => m.DenunciaModule), canActivate: [AuthGuard] },
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
