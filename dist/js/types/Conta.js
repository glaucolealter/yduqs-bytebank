import { TipoTransacao } from "./transacao/TipoTransacao.js";
/*

const Conta = {

    
}
*/
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
    get titular() {
        return this._titular;
    }
    set titular(newTitular) {
        this._titular = newTitular;
    }
    get dataAbertura() {
        return this._dataAbertura;
    }
    set dataAbertura(newDataAbertura) {
        this._dataAbertura = newDataAbertura;
    }
    get dataEncerramento() {
        return this._dataEncerramento;
    }
    set dataEncerramento(newDataEncerramento) {
        this._dataEncerramento = newDataEncerramento;
    }
    get saldo() {
        return this._saldo;
    }
    // set saldo(newSaldo: number) {
    //     this._saldo = newSaldo;
    // }
    get limite() {
        return this._limite;
    }
    set limite(newLimite) {
        this._limite = newLimite;
    }
    get transacoes() {
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
        const listaTransacoes = structuredClone(this._transacoes);
        const transacoesOrdenadas = listaTransacoes.sort((t1, t2) => t2.data.getTime() - t1.data.getTime());
        let labelAtualGrupoTransacao = "";
        for (let transacao of transacoesOrdenadas) {
            let labelGrupoTransacao = transacao.data.toLocaleDateString("pt-br", { month: "long", year: "numeric" });
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
        if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
            this.depositar(novaTransacao.valor);
        }
        else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
            this.debitar(novaTransacao.valor);
            novaTransacao.valor *= -1;
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
