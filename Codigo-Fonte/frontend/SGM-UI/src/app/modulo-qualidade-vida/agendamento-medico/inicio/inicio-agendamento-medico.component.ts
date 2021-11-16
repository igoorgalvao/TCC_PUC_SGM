import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import { MessageService, SelectItem } from 'primeng/api';
import { ImpostoService } from 'src/app/service/cidadao-service/imposto.service';
import { LocalidadeService } from 'src/app/service/cidadao-service/localidade.service';
import { SessaoService } from 'src/app/service/sessao.service';
import { GerarImposto } from 'src/app/shared/model/modulo-cidadao/gerar-imposto';
import { UsuarioLogado } from 'src/app/shared/model/usuario-logado';


@Component({
  selector: 'app-inicio-agendamento-medico',
  templateUrl: './inicio-agendamento-medico.component.html',
  styleUrls: ['./inicio-agendamento-medico.component.css']
})
export class InicioAgendamentoMedicoComponent implements OnInit {


  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  incluir() {
    this.router.navigate(['/agendamento-medico/incluir']);
  }

  consultar() {
    this.router.navigate(['/agendamento-medico/consultar']);
  }


}
