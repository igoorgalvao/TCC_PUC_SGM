import { FichaSus } from "./ficha-sus";

export class AgendamentoMedico {

    public id: number;
    public cpf: string;
    public idFichaSus: number;
    public dataHoraAgendamento: Date;
    public idUbs: number;
    public especialidade: string;

    public fichaSus: FichaSus = new FichaSus();

}
