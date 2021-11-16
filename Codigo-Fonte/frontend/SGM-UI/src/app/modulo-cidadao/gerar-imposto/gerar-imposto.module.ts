import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PrimengModule } from 'src/app/shared/primeng/primeng.module';
import { GerarImpostoRoutingModule } from './gerar-imposto-routing.module';
import { GerarImpostoComponent } from './gerar-imposto.component';


@NgModule({
  declarations: [
    GerarImpostoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    GerarImpostoRoutingModule,
    PrimengModule
  ],
  providers: [],
})
export class GerarImpostoModule { }
