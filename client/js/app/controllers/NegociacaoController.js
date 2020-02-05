class NegociacaoController {

    constructor (){

        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        let self = this;
        this._listaNegoiacoes = new Proxy(new ListaNegociacoes(),  {
            
            get: function(target, prop, receiver) {

                if(['adiciona', 'esvazia'].includes(prop) && typeof(target[prop]) == typeof(Function)) {
                    
                    return function(){

                        console.log(` interceptando ${prop}`);
                        self.NegociacoesView.update(x)
                        Reflect.apply(target[prop], target, arguments);
                    }

                }
                return Reflect.get(target, prop, receiver);
            }
        });    
        

        
        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._negociacoesView.update(this._listaNegociacoes); // maté mesmo com a armadilha para fazer a primeira renderezacao da lista

        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagemView.update(this._mensagem);
    }

    apaga(){

        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso.';
        this._mensagemView.update(this._mensagem);
    }

    adiciona(event) {

        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = 'Negociação realizada com sucesso.';
        this._mensagemView.update(this._mensagem);
        
        this._limpaFormulario();
    }

    _criaNegociacao (){

        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    _limpaFormulario(){

        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        
        this._inputData.focus();
    }
}