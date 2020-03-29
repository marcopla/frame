class NegociacaoDao {

    constructor(connection){

        this._connection = connection;
        this._store = 'negociacoes';
    }

    adiciona(negociacao) {

        return new Promise((resolve, reject) =>{

            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(negociacao);

            request.onsuccess = e => {

                resolve();
            };

            request.onerror = e => {

                console.log(e.target.error);
                reject('Não foi possível adicionar a negociação');
            };

        });
    }

    listaTodos(){
        return new Promisse((resolve, reject) => {

            let cursor = this._connection
                .transaction([this.store], 'readwrite')
                .objectStore(this.store)
                .openCursor();
                
                cursor.onsuccess = event => {

                    
                    let atual = event.target.result;
                    
                    if(atual){   
                    
                    }
                };
                cursor.onerror = event => {

                    console.log(event.target.error.name);
    
                };

        };
    }
}