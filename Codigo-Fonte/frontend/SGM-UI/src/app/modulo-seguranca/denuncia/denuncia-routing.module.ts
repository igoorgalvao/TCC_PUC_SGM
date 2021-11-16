import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/utility/auth.guard';
import { IncluirDenunciaComponent } from './incluir/incluir-denuncia.component';

const routes: Routes = [
  {
    path: '',
    component: IncluirDenunciaComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: 'incluir',
    component: IncluirDenunciaComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DenunciaRoutingModule {
}
