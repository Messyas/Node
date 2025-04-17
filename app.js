const http = require('http') //importacao em tempo de execucao de forma sincrona.
//ja importacao vai import vai ser em tempo de compilacao e de forma asincrona.  

const servidor = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain; charset=utf-8');
    res.end('Ola, Tic em Trilhas');
});

const porta = 3000;
const host = 'localhost';

servidor.listen(porta, host, () => {
    console.log(`Servidor executando em http://${host}:${porta}/`);
});

exemploTradicional();

//util para acessar a funcao antes da declaracao
function exemploTradicional() {
    console.log('Tradicional');
};

//mais flexivel para atribuir funcoes a variaveis
const exemploExpressao = function() {
    console.log('Expressao');
};

//mais flexivel para atribuir funcoes a variaveis
//tambem pode ser usada como funcao anonima, nao possuir um nome, mas pode ser atribuida a variaveis
//podem ser enviadas diretamente atravez de uma outra funcao via parametro
const exemploArrow = () => {
    console.log('Arrow');
};