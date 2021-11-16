import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PrimengModule } from 'src/app/shared/primeng/primeng.module';
import { ConsultarUnidadeBasicaSaudeComponent } from './consultar/consultar-unidade-basica-saude.component';
import { IncluirUnidadeBasicaSaudeComponent } from './incluir/incluir-unidade-basica-saude.component';
import { UnidadeBasicaSaudeRoutingModule } from './unidade-basica-saude-routing.module';

@NgModule({
  declarations: [
    ConsultarUnidadeBasicaSaudeComponent,
    IncluirUnidadeBasicaSaudeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    UnidadeBasicaSaudeRoutingModule,
    PrimengModule,

  ],
  providers: [
  ],
})
export class UnidadeBasicaSaudeModule { }
