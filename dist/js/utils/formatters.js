import { FormatoData } from "../types/FormatoData.js";
export function formatarMoeda(valor) {
    return valor.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}
export function formatarData(data, formato = FormatoData.PADRAO) {
    let dData = new Date(data);
    if (formato === FormatoData.DIA_SEMANA_DIA_MES_ANO) {
        return dData.toLocaleDateString("pt-br", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    }
    else if (formato === FormatoData.DIA_MES) {
        return dData.toLocaleDateString("pt-br", { day: "2-digit", month: "2-digit" });
    }
    return dData.toLocaleDateString("pt-br");
}
