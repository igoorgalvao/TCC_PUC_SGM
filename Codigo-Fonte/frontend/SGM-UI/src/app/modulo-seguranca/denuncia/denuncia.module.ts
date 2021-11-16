import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrimengModule } from 'src/app/shared/primeng/primeng.module';
import { DenunciaRoutingModule } from './denuncia-routing.module';
import { IncluirDenunciaComponent } from './incluir/incluir-denuncia.component';

@NgModule({
  declarations: [
    IncluirDenunciaComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DenunciaRoutingModule,
    PrimengModule,

  ],
  providers: [
  ],
})
export class DenunciaModule { }
