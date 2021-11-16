import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UnidadeBasicaSaude } from 'src/app/shared/model/modulo-qualidade-vida/unidade-basica-saude';
import { ContextAppEnum } from '../context-app-enum';
import { HttpClientService } from '../http-client.service';


@Injectable({
  providedIn: 'root'
})
export class UnidadeBasicaSaudeService extends HttpClientService {

  constructor(
    protected http: HttpClient) {
    super("unidade-basica-saude", ContextAppEnum.QUALIDADE_API);
  }


  salvar(dto: UnidadeBasicaSaude): Observable<UnidadeBasicaSaude> {
    return this.http.post<UnidadeBasicaSaude>(`${this.baseUrl}`, dto);
  }

  alterar(dto: UnidadeBasicaSaude): Observable<UnidadeBasicaSaude> {
    return this.http.put<UnidadeBasicaSaude>(`${this.baseUrl}`, dto);
  }

  pesquisar(dto: UnidadeBasicaSaude): Observable<UnidadeBasicaSaude[]> {
    return this.http.post<UnidadeBasicaSaude[]>(`${this.baseUrl}/pesquisar`, dto);
  }

  consultarPorId(id: number): Observable<UnidadeBasicaSaude> {
    return this.http.get<UnidadeBasicaSaude>(`${this.baseUrl}/${id}`);
  }

  excluir(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

}
