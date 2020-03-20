class ListaNegociacoes{

    constructor(){
        
        this._negociacoes = [];
 
    }

    adiciona(negociacao){

        this._negociacoes = [].concat(this._negociacoes, negociacao);

    }

    get negociacoes() {

        return [].concat(this._negociacoes);
    }

    esvazia(_negociacoes){
        
        this._negociacoes = [];

    }
}