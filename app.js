//const http = require('http') -> importacao em tempo de execucao de forma sincrona.
//ja importacao vai import vai ser em tempo de compilacao e de forma asincrona.  
import http from 'http'; //padrao module
import fs from 'fs';

//metodos sincronos, podem gerar problemas de performace. ( writeFileSync, readFileSync)
fs.writeFile('./mensagem.txt', 'Ola, TIC em Trilhas do arquivo!', 'utf-8', (erro) => {
    if (erro) {
        console.log('Falha ao escrever o arquivo', erro);
        return;
    }
    console.log('Arquivo foi criado con sucesso');
});

fs.readFile('./mensagem.txt', 'utf-8', (erro, conteudo) => {
    if (erro) {
        console.log('Falha na leitura do arquivo', erro);
        return;
    }
    console.log(`Conteudo: ${conteudo}`);
    iniciaServidorHttp(conteudo);
});

function iniciaServidorHttp(mensagem) {
    const servidor = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'text/plain; charset=utf-8');
        res.end(mensagem);
    });

    const porta = 3000;
    const host = 'localhost';

    servidor.listen(porta, host, () => {
        console.log(`Servidor executando em http://${host}:${porta}/`);
    });
}

/* ============================================================================|
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
*/