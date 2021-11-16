import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgendamentoMedico } from 'src/app/shared/model/modulo-qualidade-vida/agendamento-medico';
import { UnidadeBasicaSaude } from 'src/app/shared/model/modulo-qualidade-vida/unidade-basica-saude';
import { ContextAppEnum } from '../context-app-enum';
import { HttpClientService } from '../http-client.service';


@Injectable({
  providedIn: 'root'
})
export class AgendamentoMedicoService extends HttpClientService {

  constructor(
    protected http: HttpClient) {
    super("agendamento-medico", ContextAppEnum.QUALIDADE_API);
  }

  listarUBS(): Observable<UnidadeBasicaSaude[]> {
    return this.http.get<UnidadeBasicaSaude[]>(`${this.baseUrl}/listarUSB`);
  }

  salvarAgendamento(dto: AgendamentoMedico): Observable<AgendamentoMedico> {
    return this.http.post<AgendamentoMedico>(`${this.baseUrl}`, dto);
  }

  alterarAgendamento(dto: AgendamentoMedico): Observable<AgendamentoMedico> {
    return this.http.put<AgendamentoMedico>(`${this.baseUrl}`, dto);
  }

  pesquisar(cpf: string): Observable<AgendamentoMedico[]> {
    return this.http.get<AgendamentoMedico[]>(`${this.baseUrl}/pesquisar/${cpf}`);
  }

  consultarPorId(id: number): Observable<AgendamentoMedico> {
    return this.http.get<AgendamentoMedico>(`${this.baseUrl}/${id}`);
  }

  excluir(idAgendamento: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${idAgendamento}`);
  }

}
