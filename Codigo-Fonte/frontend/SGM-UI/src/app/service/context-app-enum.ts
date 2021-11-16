import { TipoContexto } from "./tipo-contexto";

export class ContextAppEnum {

    static CIDADAO_API: TipoContexto = {
        contextPath: 'cidadao-api',
        porta: 9091,
        url: 'https://tcc-backend-cidadao-api.herokuapp.com'
    };
    static GEORREFERENCIA_API: TipoContexto = {
        contextPath: 'georreferencia-api',
        porta: 9092,
        url: 'URL'
    };
    static QUALIDADE_API: TipoContexto = {
        contextPath: 'qualidadevida-api',
        porta: 9093,
        url: 'https://tcc-backend-qualidade-api.herokuapp.com/'
    };
    static SEGURANCA_API: TipoContexto = {
        contextPath: 'seguranca-api',
        porta: 9094,
        url: 'https://tcc-backend-seguranca-api.herokuapp.com/'
    };


}
