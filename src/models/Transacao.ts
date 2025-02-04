class Transacao {
    private _tipoTransacao: TipoTransacao;
    private _valor: number;
    private _data: Date = new Date();
    private _titularOrigem: string;
    private _titularDestino: string;

    constructor(data: Date, valor: number, tipoTransacao: TipoTransacao, titularOrigem: string, titularDestino: string) {
        this._tipoTransacao = tipoTransacao;
        this._valor =  valor;
        this._data = data;
        this._titularOrigem = titularOrigem;
        this._titularDestino = titularDestino;
    }

    public getTipoTransacao(): TipoTransacao {
        return this._tipoTransacao;
    }
    
    public setTipoTransacao(newTipoTransacao: TipoTransacao) {
        this._tipoTransacao = newTipoTransacao;
    }

    public getValor(): number {
        return this._valor;
    }
    
    public setValor(newValor: number) {
        this._valor = newValor;
    }

    public getData(): Date {
        return this._data;
    }
    
    public setData(newData: Date) {
        this._data = newData;
    }

    public getTitularOrigem(): string {
        return this._titularOrigem;
    }
    
    public setTitularOrigem(newTitularOrigem: string) {
        this._titularOrigem = newTitularOrigem;
    }

    public getTitularDestino(): string {
        return this._titularDestino;
    }
    
    public setTitularDestino(newTitularDestino: string) {
        this._titularDestino = newTitularDestino;
    }

    public static clone(obj: any): Transacao {
        var ts = new Transacao(obj._data, obj._valor, obj._tipoTransacao, obj._titularOrigem, obj._titularDestino);
        return ts;
    }
}

export type GrupoTransacao = {
    label: string;
    transacoes: Transacao[];
}

export enum TipoTransacao {
    DEPOSITO = "Depósito",
    TRANSFERENCIA = "Transferência",
    PAGAMENTO_BOLETO = "Pagamento de Boleto"
}

export default Transacao