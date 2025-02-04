import Transacao from "./Transacao.js";
import { TipoTransacao } from "../types/transacao/TipoTransacao.js";
class Conta {
    _titular;
    _dataAbertura;
    _dataEncerramento;
    _saldo;
    _limite;
    _transacoes;
    constructor() {
        this._saldo = JSON.parse(localStorage.getItem("saldo")) || 0;
        this._titular = "Glauco Vinicius de Oliveira Leal";
        this._dataAbertura = new Date();
        this._dataEncerramento = null;
        this._limite = 1000;
        this._transacoes = JSON.parse(localStorage.getItem("transacoes"), (key, value) => {
            if (key === "data") {
                return new Date(value);
            }
            return value;
        }) || [];
    }
    getTitular() {
        return this._titular;
    }
    setTitular(newTitular) {
        this._titular = newTitular;
    }
    getDataAbertura() {
        return this._dataAbertura;
    }
    setDataAbertura(newDataAbertura) {
        this._dataAbertura = newDataAbertura;
    }
    getDataEncerramento() {
        return this._dataEncerramento;
    }
    setDataEncerramento(newDataEncerramento) {
        this._dataEncerramento = newDataEncerramento;
    }
    getSaldo() {
        return this._saldo;
    }
    // set saldo(newSaldo: number) {
    //     this._saldo = newSaldo;
    // }
    getLimite() {
        return this._limite;
    }
    setLimite(newLimite) {
        this._limite = newLimite;
    }
    getTransacoes() {
        return this._transacoes;
    }
    // set transacoes(newTransacoes: Transacao[]) {
    //     this._transacoes = newTransacoes;
    // }
    getDataAcesso() {
        return new Date();
    }
    getPrimeiroNomeTitular() {
        return this._titular.split(' ')[0];
    }
    debitar(valor) {
        if (valor <= 0) {
            throw new Error("O valor a ser debitado deve ser maior que zero!");
        }
        if (valor > this._saldo) {
            throw new Error("Saldo insuficiente!");
        }
        this._saldo -= valor;
        localStorage.setItem("saldo", this._saldo.toString());
    }
    depositar(valor) {
        if (valor <= 0) {
            throw new Error("O valor a ser depositado deve ser maior que zero!");
        }
        this._saldo += valor;
        localStorage.setItem("saldo", this._saldo.toString());
    }
    getGruposTransacoes() {
        const gruposTransacoes = [];
        const listaTransacoes = [];
        this._transacoes.forEach(t => listaTransacoes.push(Transacao.clone(t)));
        console.log(listaTransacoes.map(t => t instanceof Transacao));
        const transacoesOrdenadas = listaTransacoes.sort((t1, t2) => new Date(t2.getData()).getTime() - new Date(t1.getData()).getTime());
        let labelAtualGrupoTransacao = "";
        for (let transacao of transacoesOrdenadas) {
            let dataTransacao = new Date(transacao.getData());
            let labelGrupoTransacao = dataTransacao.toLocaleDateString("pt-br", { month: "long", year: "numeric" });
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
    registrarTransacao(novaTransacao) {
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
