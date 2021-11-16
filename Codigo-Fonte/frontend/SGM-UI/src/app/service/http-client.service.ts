import { Inject, Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { TipoContexto } from "./tipo-contexto";

@Injectable({
    providedIn: 'root'
})

export class HttpClientService {

    protected baseUrl: string;

    constructor(@Inject(String) path: string, @Inject(TipoContexto) appEnum: TipoContexto) {
        if (environment.useHerokubackend) {
            this.baseUrl = `${appEnum.url}/${appEnum.contextPath}/${path}`;
        } else {
            this.baseUrl = `${environment.urlbackend}:${appEnum.porta}/${appEnum.contextPath}/${path}`;
        }
    }
}