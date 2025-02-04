import { formatarData, formatarMoeda } from "../utils/formatters.js";
import Conta from "../models/Conta.js";
import { FormatoData } from "../types/FormatoData.js";

const elementoSaldo = document.querySelector(".saldo-valor .valor") as HTMLElement;
const elementoNomeTitular = document.querySelector(".usuario span") as HTMLElement;
const elementoPrimeiroNomeTitular = document.querySelector(".block-saldo h2") as HTMLElement;
const elementoDataAcesso = document.querySelector(".block-saldo time") as HTMLElement;

let conta = new Conta();
elementoNomeTitular.textContent = conta.getTitular();
elementoPrimeiroNomeTitular.textContent = `Olá, ${conta.getPrimeiroNomeTitular()}!`
elementoDataAcesso.textContent = formatarData(conta.getDataAcesso(), FormatoData.DIA_SEMANA_DIA_MES_ANO);

mostrarSaldo();
function mostrarSaldo(): void {
    let conta = new Conta();
    elementoSaldo.textContent = formatarMoeda(conta.getSaldo());
    console.log("SaldoComponent: mostrarSaldo!");
    console.log("Grupo de Transações",conta.getGruposTransacoes());
}

const SaldoComponent = {
    atualizarSaldo() {
        mostrarSaldo();
        console.log("SaldoComponent: atualizarSaldo!");
    }    
}

export default SaldoComponent;