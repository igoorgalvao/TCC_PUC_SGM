import { CommonModule, registerLocaleData } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PrimengModule } from 'src/app/shared/primeng/primeng.module';
import { AgendamentoMedicoRoutingModule } from './agendamento-medico-routing.module';
import { ConsultarAgendamentoMedicoComponent } from './consultar/consultar-agendamento-medico.component';
import { IncluirAgendamentoMedicoComponent } from './incluir/incluir-agendamento-medico.component';
import { InicioAgendamentoMedicoComponent } from './inicio/inicio-agendamento-medico.component';

@NgModule({
  declarations: [
    ConsultarAgendamentoMedicoComponent,
    IncluirAgendamentoMedicoComponent,
    InicioAgendamentoMedicoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AgendamentoMedicoRoutingModule,
    PrimengModule,

  ],
  providers: [
  ],
})
export class AgendametoMedicoModule { }
