import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { MessageService, SelectItem } from 'primeng/api';
import { ImpostoService } from 'src/app/service/cidadao-service/imposto.service';
import { LocalidadeService } from 'src/app/service/cidadao-service/localidade.service';
import { SessaoService } from 'src/app/service/sessao.service';
import { GerarImposto } from 'src/app/shared/model/modulo-cidadao/gerar-imposto';
import { UsuarioLogado } from 'src/app/shared/model/usuario-logado';


@Component({
  selector: 'app-gerar-imposto',
  templateUrl: './gerar-imposto.component.html',
  styleUrls: ['./gerar-imposto.component.css']
})
export class GerarImpostoComponent implements OnInit {

  public dto: GerarImposto = new GerarImposto();
  public usuarioLogado: UsuarioLogado;


  tipoPessoa: SelectItem[] = [];

  constructor(
    private service: ImpostoService,
    private localidadeService: LocalidadeService,
    private messageService: MessageService,
    private sessaoService: SessaoService
  ) { }

  ngOnInit(): void {

    this.sessaoService.recuperarUsuarioLogado().then(retorno => {
      this.usuarioLogado = retorno;
    }, () => {
      console.log('ERRO');
    });

    this.tipoPessoa = [
      { label: 'Física', value: 1 },
      { label: 'Jurídica', value: 2 },
      { label: 'Rural', value: 3 },
    ];

  }

  validarForm() {
    if (!this.dto.cpfCnpj || !this.dto.tipoPessoa || !this.dto.cep || !this.dto.numero) {
      this.messageService.add({ severity: 'warn', summary: 'Atenção', detail: 'Campos obrigatórios não preenchidos.' });
      return false;
    }

    return true;
  }

  gerarImposto() {
    if (!this.validarForm()) {
      return;
    }

    this.dto.usuarioAcesso = this.usuarioLogado.email;

    this.service.gerarImpostoPorTipoPessoa(this.dto).subscribe(response => {
      let blob: any = new Blob([response], { type: 'application/pdf; charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      FileSaver.saveAs(blob, this.dto.tipoPessoa == 3 ? "ITR.pdf" : "IPTU.pdf");
    }, (erro: HttpErrorResponse) => {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'IPTU/ITR não localizado' });
    });

  }

  consultarPorCep() {
    if (this.dto.cep && this.dto.cep.length == 9) {
      this.dto.endereco = 'Consultando Endereço...'
      this.localidadeService.consultaPorCep(this.dto.cep).subscribe(retorno => {
        if (retorno && retorno.logradouro) {
          this.dto.endereco = `${retorno.logradouro} - ${retorno.bairro} , ${retorno.uf} - ${retorno.localidade}`
        } else {
          this.dto.endereco = "Endereço não localizado";
        }
      }, (erro: HttpErrorResponse) => {
        this.dto.endereco = "Endereço não localizado";
        console.log(erro.error.mensagemErro);
      });
    }
  }

  limpar() {
    this.dto = new GerarImposto();
  }


}
