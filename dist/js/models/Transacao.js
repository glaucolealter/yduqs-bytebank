class Transacao {
    _tipoTransacao;
    _valor;
    _data;
    _titularOrigem;
    _titularDestino;
    constructor(data, valor, tipoTransacao, titularOrigem, titularDestino) {
        this._tipoTransacao = tipoTransacao;
        this._valor = valor;
        this._data = data;
        this._titularOrigem = titularOrigem;
        this._titularDestino = titularDestino;
    }
    getTipoTransacao() {
        return this._tipoTransacao;
    }
    setTipoTransacao(newTipoTransacao) {
        this._tipoTransacao = newTipoTransacao;
    }
    getValor() {
        return this._valor;
    }
    setValor(newValor) {
        this._valor = newValor;
    }
    getData() {
        return this._data;
    }
    setData(newData) {
        this._data = newData;
    }
    getTitularOrigem() {
        return this._titularOrigem;
    }
    setTitularOrigem(newTitularOrigem) {
        this._titularOrigem = newTitularOrigem;
    }
    getTitularDestino() {
        return this._titularDestino;
    }
    setTitularDestino(newTitularDestino) {
        this._titularDestino = newTitularDestino;
    }
    static clone(obj) {
        var ts = new Transacao(obj._data, obj._valor, obj._tipoTransacao, obj._titularOrigem, obj._titularDestino);
        return ts;
    }
}
export default Transacao;
