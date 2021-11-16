import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endereco } from 'src/app/shared/model/modulo-cidadao/endereco';
import { ContextAppEnum } from '../context-app-enum';
import { HttpClientService } from '../http-client.service';


@Injectable({
  providedIn: 'root'
})
export class LocalidadeService extends HttpClientService {

  constructor(
    protected http: HttpClient) {
    super("localidade", ContextAppEnum.CIDADAO_API);
  }

  consultaPorCep(cep: string): Observable<Endereco> {
    return this.http.get<Endereco>(`${this.baseUrl}/consultaPorCep/${cep}`);
  }

}
