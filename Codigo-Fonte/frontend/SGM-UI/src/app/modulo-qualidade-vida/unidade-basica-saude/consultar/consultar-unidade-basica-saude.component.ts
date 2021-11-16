import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AgendamentoMedicoService } from 'src/app/service/qualidade-vida-service/agendamento-medico.service';
import { UnidadeBasicaSaudeService } from 'src/app/service/qualidade-vida-service/unidade-basica-saude.service';
import { UnidadeBasicaSaude } from 'src/app/shared/model/modulo-qualidade-vida/unidade-basica-saude';


@Component({
  selector: 'app-consultar-unidade-basica-saude',
  templateUrl: './consultar-unidade-basica-saude.component.html',
  styleUrls: ['./consultar-unidade-basica-saude.component.css']
})
export class ConsultarUnidadeBasicaSaudeComponent implements OnInit {

  public dto: UnidadeBasicaSaude;
  public lista: UnidadeBasicaSaude[] = [];
  public exibirGrid: boolean = false;

  constructor(
    private service: UnidadeBasicaSaudeService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.dto = new UnidadeBasicaSaude();
  }

  pesquisar() {
    this.service.pesquisar(this.dto).subscribe(retorno => {
      this.lista = retorno;
      this.exibirGrid = true;
    }, (erro: HttpErrorResponse) => {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: erro.error });
    });

  }

  openEditar(id: number) {
    this.router.navigate(['/unidade-basica-saude/incluir', { id: id }]);
  }
  openNovo() {
    this.router.navigate(['/unidade-basica-saude/incluir']);
  }

  confirmExcluir(id: number, event: Event) {
    this.confirmationService.confirm({
      target: event.target,
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      message: 'Confirma a exclusão da UBS?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.excluir(id);
      },
      reject: () => {
      }
    });
  }

  excluir(id: number) {
    this.service.excluir(id).subscribe(retorno => {
      this.pesquisar();
      this.messageService.add({ severity: 'info', summary: 'Excluído', detail: 'com sucesso' });
    }, (erro: HttpErrorResponse) => {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao excluir UBS' });
    });

  }

  limpar() {
    this.lista = [];
    this.dto = new UnidadeBasicaSaude();
    this.exibirGrid = false;
  }

}
