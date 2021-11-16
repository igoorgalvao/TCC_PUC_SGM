import { TipoDenuncia } from "./tipo-denuncia";

export class Denuncia {

    public id: number;
    public enderecoOcorrencia: string;
    public descricao: string;
    public tipoDenuncia: TipoDenuncia = new TipoDenuncia();
}
