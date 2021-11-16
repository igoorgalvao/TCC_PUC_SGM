import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { AgendamentoMedicoService } from 'src/app/service/qualidade-vida-service/agendamento-medico.service';
import { FichaSusService } from 'src/app/service/qualidade-vida-service/ficha-sus.service';
import { UnidadeBasicaSaudeService } from 'src/app/service/qualidade-vida-service/unidade-basica-saude.service';
import { SessaoService } from 'src/app/service/sessao.service';
import { AgendamentoMedico } from 'src/app/shared/model/modulo-qualidade-vida/agendamento-medico';
import { UnidadeBasicaSaude } from 'src/app/shared/model/modulo-qualidade-vida/unidade-basica-saude';


@Component({
  selector: 'app-incluir-unidade-basica-saude',
  templateUrl: './incluir-unidade-basica-saude.component.html',
  styleUrls: ['./incluir-unidade-basica-saude.component.css']
})
export class IncluirUnidadeBasicaSaudeComponent implements OnInit {

  public dto: UnidadeBasicaSaude = new UnidadeBasicaSaude();
  public edicao: boolean = false;

  constructor(
    private service: UnidadeBasicaSaudeService,
    private router: Router,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.recuperarInfRota();
  }

  recuperarInfRota() {
    this.edicao = false;

    this.activatedRoute.params.subscribe(params => {
      if (!!params.id) {
        this.consultarPorId(params.id);
        this.edicao = true;
      }
    });
  }



  consultarPorId(id: number) {
    this.service.consultarPorId(id).subscribe(retorno => {
      this.dto = retorno;
    }, () => {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao realizar consulta' });
    });
  }


  save() {
    return this.edicao ? this.alterar() : this.salvar();
  }

  alterar() {
    if (!this.validarForm()) {
      return;
    }
    this.service.alterar(this.dto).subscribe(retorno => {
      this.consultarPorId(retorno.id)
      this.messageService.add({ severity: 'success', summary: 'Atenção', detail: 'UBS alterada com sucesso.' });
    }, (erro: HttpErrorResponse) => {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: erro.error });
    });


  }

  salvar() {
    if (!this.validarForm()) {
      return;
    }
    this.service.salvar(this.dto).subscribe(retorno => {
      this.dto = retorno;
      this.messageService.add({ severity: 'success', summary: 'Atenção', detail: 'UBS salva com sucesso.' });
      this.limpar();
    }, (erro: HttpErrorResponse) => {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: erro.error });
    });

  }

  validarForm() {
    if (!this.dto.nome || !this.dto.endereco) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Campos obrigatórios não preenchidos.' });
      return false;
    }

    return true;
  }

  limpar() {
    if (this.edicao) {
      this.consultarPorId(this.dto.id);
    } else {
      this.dto = new UnidadeBasicaSaude();
    }

  }

  voltar() {
    this.router.navigate(['/unidade-basica-saude']);
  }


}
