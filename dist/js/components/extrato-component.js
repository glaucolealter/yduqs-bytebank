import Conta from "../types/Conta.js";
import { FormatoData } from "../types/FormatoData.js";
import { formatarData, formatarMoeda } from "../utils/formatters.js";
const elementoRegistroTransacoesExtrato = document.querySelector(".extrato .registro-transacoes");
function montarExtrato() {
    let gruposTransacoes = Conta.getGruposTransacoes();
    elementoRegistroTransacoesExtrato.innerHTML = "";
    if (gruposTransacoes.length == 0) {
        elementoRegistroTransacoesExtrato.innerHTML = "Sem transações";
        return;
    }
    for (let grupoTransacao of gruposTransacoes) {
        let htmlGrupo = "";
        let htmlTransacao = "";
        for (let transacao of grupoTransacao.transacoes) {
            htmlTransacao += `<div class="transacao-item">
                                    <div class="transacao-info">
                                        <span class="tipo">${transacao.tipoTransacao}</span>
                                        <strong class="valor">${formatarMoeda(transacao.valor)}</strong>
                                    </div>
                                    <time class="data">${formatarData(transacao.data, FormatoData.DIA_MES)}</time>
                                </div>`;
        }
        htmlGrupo += `<div class="transacoes-group">
            <strong class="mes-group">${grupoTransacao.label}</strong>
            ${htmlTransacao}
        </div>`;
        elementoRegistroTransacoesExtrato.innerHTML += htmlGrupo;
    }
}
const ExtratoComponent = {
    atualizar() {
        montarExtrato();
    }
};
montarExtrato();
export default ExtratoComponent;
