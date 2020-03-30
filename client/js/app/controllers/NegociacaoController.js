class NegociacaoController {

    constructor (){
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        
        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona', 'esvazia', 'ordena', 'inverteOrdem)');
        
        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto');

        this._ordemAtual = '';

        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .then(negociacoes => 
                negociacoes.forEach(negociacao => 
                    this._listaNegociacoes.adiciona(negociacao)));

    }

    apaga(){

        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso.';
        console.log(this._mensagem);
    }

    importaNegociacoes(){
        
        let service = new NegociacaoServices();

        Promise.all([
            service.ObterNegociacoesDaSemana(),
            service.ObterNegociacoesDaSemanaAnterior(),
            service.ObterNegociacoesDaSemanaRetrasada()
        ])
        .then( negociacoes => { 
            negociacoes
                .reduce((arrayAchatado, array) => arrayAchatado.concat(array), [])
                .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
        
            this._mensagem.texto = 'Negociações importadas com sucesso.';
            })
            .catch(error => this._mensagem.texto = error);
    }
        /*
        service.ObterNegociacoesDaSemana()
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociação da semana obtida com sucesso.';
            })
            .catch(erro => this._mensagem.texto = erro);

        service.ObterNegociacoesDaSemanaAnterior()
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociação da semana obtida com sucesso.';
            })
            .catch(erro => this._mensagem.texto = erro);
        
        service.ObterNegociacoesDaSemanaRetrasada()
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociação da semana obtida com sucesso.';
            })
            .catch(erro => this._mensagem.texto = erro);
    }
    */
    adiciona(event) {
        event.preventDefault();

        ConnectionFactory
            .getConnection()
            .then(connection => {
                
                let negociacao = this._criaNegociacao();
                
                new NegociacaoDao(connection)
                    .adiciona(negociacao)
                    .then(() => {
                        this._listaNegociacoes.adiciona(negociacao);
                        this._mensagem.texto = 'Negociação realizada com sucesso.';
                        this._limpaFormulario();
                    })
            })
            .catch(erro => this._mensagem.texto = erro);
    }

    _criaNegociacao (){
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
    }

    _limpaFormulario(){
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0; 
        this._inputData.focus();
    }
}