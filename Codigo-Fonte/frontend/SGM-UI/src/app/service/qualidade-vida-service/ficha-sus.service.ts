import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endereco } from 'src/app/shared/model/modulo-cidadao/endereco';
import { FichaSus } from 'src/app/shared/model/modulo-qualidade-vida/ficha-sus';
import { ContextAppEnum } from '../context-app-enum';
import { HttpClientService } from '../http-client.service';


@Injectable({
  providedIn: 'root'
})
export class FichaSusService extends HttpClientService {

  constructor(
    protected http: HttpClient) {
    super("fichaSus", ContextAppEnum.QUALIDADE_API);
  }

  obterFichaSus(cpf: string): Observable<FichaSus> {
    return this.http.get<FichaSus>(`${this.baseUrl}/obterFichaSus/${cpf}`);
  }

}
