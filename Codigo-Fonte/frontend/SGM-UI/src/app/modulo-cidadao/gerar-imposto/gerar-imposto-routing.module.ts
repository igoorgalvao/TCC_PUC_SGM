import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/utility/auth.guard';
import { GerarImpostoComponent } from './gerar-imposto.component';

const routes: Routes = [
  {
    path: '',
    component: GerarImpostoComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: 'gerar-imposto',
    component: GerarImpostoComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GerarImpostoRoutingModule {
}
