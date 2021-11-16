import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/utility/auth.guard';
import { ConsultarAgendamentoMedicoComponent } from './consultar/consultar-agendamento-medico.component';
import { IncluirAgendamentoMedicoComponent } from './incluir/incluir-agendamento-medico.component';
import { InicioAgendamentoMedicoComponent } from './inicio/inicio-agendamento-medico.component';

const routes: Routes = [
  {
    path: '',
    component: InicioAgendamentoMedicoComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: 'consultar',
    component: ConsultarAgendamentoMedicoComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: 'incluir',
    component: IncluirAgendamentoMedicoComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendamentoMedicoRoutingModule {
}
