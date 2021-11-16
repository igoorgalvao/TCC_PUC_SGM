import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { AgendamentoMedicoService } from 'src/app/service/qualidade-vida-service/agendamento-medico.service';
import { FichaSusService } from 'src/app/service/qualidade-vida-service/ficha-sus.service';
import { SessaoService } from 'src/app/service/sessao.service';
import { AgendamentoMedico } from 'src/app/shared/model/modulo-qualidade-vida/agendamento-medico';
import { UnidadeBasicaSaude } from 'src/app/shared/model/modulo-qualidade-vida/unidade-basica-saude';


@Component({
  selector: 'app-incluir-agendamento-medico',
  templateUrl: './incluir-agendamento-medico.component.html',
  styleUrls: ['./incluir-agendamento-medico.component.css']
})
export class IncluirAgendamentoMedicoComponent implements OnInit {

  public dto: AgendamentoMedico = new AgendamentoMedico();
  public exibirDadosSus: boolean = false;

  public listaUBS: UnidadeBasicaSaude[] = [];
  public enderecoUBS: string;
  public dateHoje: Date = null;

  public edicao: boolean = false;

  constructor(
    private service: AgendamentoMedicoService,
    private router: Router,
    private fichaSusService: FichaSusService,
    private messageService: MessageService,
    private sessaoService: SessaoService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.recuperarInfRota();
    this.dateHoje = new Date();
    this.carregarCombos();
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

  consultarFichaSus() {
    this.exibirDadosSus = false;

    if (this.dto.cpf) {
      this.fichaSusService.obterFichaSus(this.dto.cpf).subscribe(retorno => {
        this.dto.fichaSus = retorno;
        this.exibirDadosSus = true;
      }, () => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao consultar SUS' });
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Campos obrigatórios não preenchidos.' });
    }
  }

  carregarCombos() {
    this.service.listarUBS().subscribe(retorno => {
      this.listaUBS = retorno;
    }, () => {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao realizar consulta' });
    });
  }

  consultarPorId(id: number) {
    this.service.consultarPorId(id).subscribe(retorno => {
      this.dto = retorno;
      this.dto.dataHoraAgendamento = new Date(this.dto.dataHoraAgendamento);
      this.recuperarEnderecoUBS();
      this.exibirDadosSus = true;
    }, () => {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao realizar consulta' });
    });
  }

  recuperarEnderecoUBS() {
    if (this.dto.idUbs) {
      this.enderecoUBS = this.listaUBS.find(item => item.id == this.dto.idUbs).endereco;
    }
  }

  save() {
    return this.edicao ? this.alterarAgendamento() : this.salvarAgendamento();
  }

  alterarAgendamento() {
    if (!this.validarForm()) {
      return;
    }
    this.service.alterarAgendamento(this.dto).subscribe(retorno => {
      this.consultarPorId(retorno.id)
      this.messageService.add({ severity: 'success', summary: 'Atenção', detail: 'Agendamento alterado com sucesso.' });
    }, (erro: HttpErrorResponse) => {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: erro.error });
    });


  }

  salvarAgendamento() {
    if (!this.validarForm()) {
      return;
    }
    this.service.salvarAgendamento(this.dto).subscribe(retorno => {
      this.dto = retorno;
      this.messageService.add({ severity: 'success', summary: 'Atenção', detail: 'Agendamento realizado com sucesso.' });
      this.limpar();
    }, (erro: HttpErrorResponse) => {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: erro.error });
    });

  }

  validarForm() {
    if (!this.dto.cpf || !this.dto.idUbs || !this.dto.dataHoraAgendamento || !this.dto.especialidade) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Campos obrigatórios não preenchidos.' });
      return false;
    }

    return true;
  }

  limpar() {
    if (this.edicao) {
      this.consultarPorId(this.dto.id);
    } else {
      this.dto = new AgendamentoMedico();
      this.exibirDadosSus = false;
      this.enderecoUBS = null;
    }

  }

  voltar() {
    this.router.navigate(['/agendamento-medico']);
  }


}
