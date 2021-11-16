import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AgendamentoMedicoService } from 'src/app/service/qualidade-vida-service/agendamento-medico.service';
import { AgendamentoMedico } from 'src/app/shared/model/modulo-qualidade-vida/agendamento-medico';


@Component({
  selector: 'app-consultar-agendamento-medico',
  templateUrl: './consultar-agendamento-medico.component.html',
  styleUrls: ['./consultar-agendamento-medico.component.css']
})
export class ConsultarAgendamentoMedicoComponent implements OnInit {

  public lista: AgendamentoMedico[] = [];
  public cpfConsulta: string;

  public exibirGrid: boolean = false;

  constructor(
    private service: AgendamentoMedicoService,
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
  }

  pesquisar() {

    if (!this.cpfConsulta) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Campos obrigatórios não preenchidos.' });
      return;
    }

    this.service.pesquisar(this.cpfConsulta).subscribe(retorno => {
      this.lista = retorno;
      this.exibirGrid = true;
    }, (erro: HttpErrorResponse) => {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: erro.error });
    });

  }

  openEditar(id: number) {
    this.router.navigate(['/agendamento-medico/incluir', { id: id }]);
  }

  confirmExcluir(idAgendamento: number, event: Event) {
    this.confirmationService.confirm({
      target: event.target,
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      message: 'Confirma a exclusão do agendamento?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.excluir(idAgendamento);
      },
      reject: () => {
      }
    });
  }

  excluir(idAgendamento: number) {
    this.service.excluir(idAgendamento).subscribe(retorno => {
      this.pesquisar();
      this.messageService.add({ severity: 'info', summary: 'Excluído', detail: 'com sucesso' });
    }, (erro: HttpErrorResponse) => {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao excluir agendamento' });
    });

  }


  limpar() {
    this.lista = [];
    this.cpfConsulta = null;
    this.exibirGrid = false;
  }

  voltar() {
    this.router.navigate(['/agendamento-medico']);
  }


}
