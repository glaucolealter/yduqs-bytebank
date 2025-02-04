import Transacao from "../../models/Transacao";

export type GrupoTransacao = {
    label: string;
    transacoes: Transacao[];
}