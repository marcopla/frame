class NegociacaoServices {

    ObterNegociacoesDaSemana() {

        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
    
            xhr.open('GET', 'negociacoes/anterior');

            xhr.onreadystatechange = () => {
    
                if(xhr.readyState == 4){
    
                    if(xhr.status == 200){
                    
                        resolve(JSON.parse(xhr.responseText)
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                        
                    } else {
                        console.log(xhr.responseText);
                        reject('Não foi possível obter as negociações');
                          
                    }
    
                }
    
            };
    
            xhr.send();

        });

    }

    ObterNegociacoesDaSemanaAnterior() {

        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
    
            xhr.open('GET', 'negociacoes/anterior');

            xhr.onreadystatechange = () => {
    
                if(xhr.readyState == 4){
    
                    if(xhr.status == 200){
                    
                        resolve(JSON.parse(xhr.responseText)
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                        
                    } else {
                        console.log(xhr.responseText);
                        reject('Não foi possível obter as negociações');
                          
                    }
    
                }
    
            };
    
            xhr.send();

        });

    }

    ObterNegociacoesDaSemanaRetrasada() {
        
     
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
    
            xhr.open('GET', 'negociacoes/anterior');

            xhr.onreadystatechange = () => {
    
                if(xhr.readyState == 4){
    
                    if(xhr.status == 200){
                    
                        resolve(JSON.parse(xhr.responseText)
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                        
                    } else {
                        console.log(xhr.responseText);
                        reject('Não foi possível obter as negociações');
                          
                    }
    
                }
    
            };
    
            xhr.send();

        });
    
    }
}