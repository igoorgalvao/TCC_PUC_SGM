import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GerarImposto } from 'src/app/shared/model/modulo-cidadao/gerar-imposto';
import { ContextAppEnum } from '../context-app-enum';
import { HttpClientService } from '../http-client.service';


@Injectable({
  providedIn: 'root'
})
export class ImpostoService extends HttpClientService {

  constructor(
    protected http: HttpClient) {
    super("imposto", ContextAppEnum.CIDADAO_API);
  }

  gerarImpostoPorTipoPessoa(dto: GerarImposto): any {
    return this.http.post(`${this.baseUrl}`, dto, { responseType: 'blob'});
  }


}
