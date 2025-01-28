import { formatarMoeda } from "../utils/formatters.js";
import Conta from "../types/Conta.js";
const elementoSaldo = document.querySelector(".saldo-valor .valor");
const elementoDataAcesso = document.querySelector(".block-saldo time");
mostrarSaldo();
function mostrarSaldo() {
    elementoSaldo.textContent = formatarMoeda(Conta.getSaldo());
    console.log("SaldoComponent: mostrarSaldo!");
    console.log("Grupo de Transações", Conta.getGruposTransacoes());
}
const SaldoComponent = {
    atualizarSaldo() {
        mostrarSaldo();
        console.log("SaldoComponent: atualizarSaldo!");
    }
};
export default SaldoComponent;
