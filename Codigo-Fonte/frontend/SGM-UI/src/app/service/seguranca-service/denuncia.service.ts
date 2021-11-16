import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Denuncia } from 'src/app/shared/model/modulo-qualidade-vida/denuncia';
import { TipoDenuncia } from 'src/app/shared/model/modulo-qualidade-vida/tipo-denuncia';
import { ContextAppEnum } from '../context-app-enum';
import { HttpClientService } from '../http-client.service';


@Injectable({
  providedIn: 'root'
})
export class DenunciaService extends HttpClientService {

  constructor(
    protected http: HttpClient) {
    super("denuncia", ContextAppEnum.SEGURANCA_API);
  }

  salvar(dto: Denuncia): Observable<Denuncia> {
    return this.http.post<Denuncia>(`${this.baseUrl}`, dto);
  }

  listarTipoDenuncia(): Observable<TipoDenuncia[]> {
    return this.http.get<TipoDenuncia[]>(`${this.baseUrl}/listarTipoDenuncia`);
  }


}
