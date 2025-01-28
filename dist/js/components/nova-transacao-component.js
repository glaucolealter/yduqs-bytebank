import Conta from "../types/Conta.js";
import ExtratoComponent from "./extrato-component.js";
import SaldoComponent from "./saldo-component.js";
const elementoFormulario = document.querySelector(".block-nova-transacao form");
elementoFormulario.addEventListener("submit", function (event) {
    event.preventDefault();
    try {
        if (!elementoFormulario.checkValidity()) {
            alert("Preencha todos os campos para realizar uma nova transação!");
            return;
        }
        const tipoTransacao = document.querySelector("#tipoTransacao").value;
        const valorTransacao = document.querySelector("#valor").valueAsNumber;
        const elementoData = document.querySelector("#data");
        const dataTransacao = new Date(elementoData.value + " 00:00:00");
        let novaTransacao = {
            tipoTransacao: tipoTransacao,
            valor: valorTransacao,
            data: dataTransacao
        };
        Conta.registrarTransacao(novaTransacao);
        SaldoComponent.atualizarSaldo();
        ExtratoComponent.atualizar();
        elementoFormulario.reset();
    }
    catch (err) {
        alert("Ocorreu um erro inesperado durante o processamento da transação: " + err.message);
    }
});
