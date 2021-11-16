import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UnidadeBasicaSaudeService } from 'src/app/service/qualidade-vida-service/unidade-basica-saude.service';
import { DenunciaService } from 'src/app/service/seguranca-service/denuncia.service';
import { Denuncia } from 'src/app/shared/model/modulo-qualidade-vida/denuncia';
import { TipoDenuncia } from 'src/app/shared/model/modulo-qualidade-vida/tipo-denuncia';
import { UnidadeBasicaSaude } from 'src/app/shared/model/modulo-qualidade-vida/unidade-basica-saude';


@Component({
  selector: 'app-incluir-denuncia',
  templateUrl: './incluir-denuncia.component.html',
  styleUrls: ['./incluir-denuncia.component.css']
})
export class IncluirDenunciaComponent implements OnInit {

  public dto: Denuncia = new Denuncia();
  public listaTipoDenuncia: TipoDenuncia[] = [];

  public maxLengthTextArea: number = 2000;

  constructor(
    private service: DenunciaService,
    private router: Router,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.carregarCombos();
  }

  carregarCombos() {
    this.service.listarTipoDenuncia().subscribe(retorno => {
      this.listaTipoDenuncia = retorno;
    }, () => {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao realizar consulta' });
    });
  }

  salvar() {
    if (!this.validarForm()) {
      return;
    }
    this.service.salvar(this.dto).subscribe(retorno => {
      this.dto = retorno;
      this.messageService.add({ severity: 'success', summary: 'Atenção', detail: 'Denúncia salva com sucesso.' });
      this.limpar();
    }, (erro: HttpErrorResponse) => {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: erro.error });
    });

  }

  validarForm() {
    if (!this.dto.enderecoOcorrencia || !this.dto.descricao || !this.dto.tipoDenuncia || !this.dto.tipoDenuncia.id) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Campos obrigatórios não preenchidos.' });
      return false;
    }

    return true;
  }

  limpar() {
    this.dto = new Denuncia();
  }


}
