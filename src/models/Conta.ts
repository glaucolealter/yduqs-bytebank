import Transacao from "./Transacao.js";
import { TipoTransacao } from "../types/transacao/TipoTransacao.js";
import { GrupoTransacao } from "../types/transacao/GrupoTransacao.js";

class Conta {
    private _titular: string;
    private _dataAbertura: Date;
    private _dataEncerramento: Date;
    private _saldo: number;
    private _limite: number;
    private _transacoes: Transacao[];

    constructor() {
        this._saldo = JSON.parse(localStorage.getItem("saldo")) || 0;
        this._titular = "Glauco Vinicius de Oliveira Leal";
        this._dataAbertura = new Date();
        this._dataEncerramento = null;
        this._limite = 1000;
        this._transacoes = JSON.parse(localStorage.getItem("transacoes"), (key: string, value: string) => {
            if (key === "data") {
                return new Date(value);
            }
            return value;
        }) || [];
    }

    public getTitular(): string {
        return this._titular;
    }
    
    public setTitular(newTitular: string) {
        this._titular = newTitular;
    }

    public getDataAbertura(): Date {
        return this._dataAbertura;
    }
    
    public setDataAbertura(newDataAbertura: Date) {
        this._dataAbertura = newDataAbertura;
    }

    public getDataEncerramento(): Date {
        return this._dataEncerramento;
    }
    
    public setDataEncerramento(newDataEncerramento: Date) {
        this._dataEncerramento = newDataEncerramento;
    }

    public getSaldo(): number {
        return this._saldo;
    }
    
    // set saldo(newSaldo: number) {
    //     this._saldo = newSaldo;
    // }

    public getLimite(): number {
        return this._limite;
    }
    
    public setLimite(newLimite: number) {
        this._limite = newLimite;
    }

    public getTransacoes(): Transacao[] {
        return this._transacoes;
    }
    
    // set transacoes(newTransacoes: Transacao[]) {
    //     this._transacoes = newTransacoes;
    // }

    public getDataAcesso(): Date {
        return new Date();
    }

    public getPrimeiroNomeTitular(): string {
        return this._titular.split(' ')[0];
    }

    private debitar(valor: number): void {
        if (valor <= 0) {
            throw new Error("O valor a ser debitado deve ser maior que zero!");
        }
        if (valor > this._saldo) {
            throw new Error("Saldo insuficiente!");
        }
    
        this._saldo -= valor;
        localStorage.setItem("saldo", this._saldo.toString());
    }
    
    private depositar(valor: number): void {
        if (valor <= 0) {
            throw new Error("O valor a ser depositado deve ser maior que zero!");
        }
    
        this._saldo += valor;
        localStorage.setItem("saldo", this._saldo.toString());
    }

    public getGruposTransacoes(): GrupoTransacao[] {
        const gruposTransacoes: GrupoTransacao[] = [];
        const listaTransacoes: Transacao[] = []

        this._transacoes.forEach(t => 
            listaTransacoes.push(Transacao.clone(t))
        );
        console.log(listaTransacoes.map(t => t instanceof Transacao));

        const transacoesOrdenadas: Transacao[] = listaTransacoes.sort((t1, t2) => new Date(t2.getData()).getTime() - new Date(t1.getData()).getTime());
        let labelAtualGrupoTransacao: string = "";

        for (let transacao of transacoesOrdenadas) {
            let dataTransacao = new Date(transacao.getData());
            let labelGrupoTransacao: string = dataTransacao.toLocaleDateString("pt-br", { month: "long", year: "numeric" });
            if (labelAtualGrupoTransacao !== labelGrupoTransacao) {
                labelAtualGrupoTransacao = labelGrupoTransacao;
                gruposTransacoes.push({
                    label: labelGrupoTransacao,
                    transacoes: []
                });
            }
            gruposTransacoes.at(-1).transacoes.push(transacao);
        }

        return gruposTransacoes;
    }

    public registrarTransacao(novaTransacao: Transacao): void {
        if (novaTransacao.getTipoTransacao() == TipoTransacao.DEPOSITO) {
            this.depositar(novaTransacao.getValor());
        } 
        else if (novaTransacao.getTipoTransacao() == TipoTransacao.TRANSFERENCIA || novaTransacao.getTipoTransacao() == TipoTransacao.PAGAMENTO_BOLETO) {
            this.debitar(novaTransacao.getValor());
            novaTransacao.setValor(novaTransacao.getValor() * -1);
        } 
        else {
            throw new Error("Tipo de Transação é inválido!");
        }

        this._transacoes.push(novaTransacao);
        console.log(this.getGruposTransacoes());
        localStorage.setItem("transacoes", JSON.stringify(this._transacoes));
    }
}

export default Conta;