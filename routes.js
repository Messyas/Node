//export transforma em modulo e permite que seja importado em outros arquivos.
//default, mesmo que existam outras, a funcao de rotas e a padrao.
import fs from 'fs';

export default function rotas(req, res, dado) {
    res.setHeader('Content-Type', 'application/json', 'utf-8');

    if (req.method === 'GET' && req.url === '/') {
        const { conteudo } = dado;
        
        res.statusCode = 200;

        const resposta = {
            mensagem: conteudo
        };

        res.end(JSON.stringify(resposta)); 

        return;
    }

    if (req.method === 'PUT' && req.url === '/arquivos') { // o design de apis define que deve ser no plural
        const corpo = []; 
        //listener de eventos
        req.on('data', (parte) => {
            corpo.push(parte);
        });

        req.on('end', () => {
            const arquivo = JSON.parse(corpo);
            
            res.statusCode = 400;

            if (!arquivo?.nome) {
                const resposta = {
                    erro: {
                        mensagem: `Atributo 'nome' nao foi encontrado, porem e obrigatorio para a criacao do arquivo`
                    }
                };

                res.end(JSON.stringify(resposta));

                return;
            }
            //Operador ? acessa a referencia do arquivo, 
            // no caso do conteudo foi usado?? para dizer ao node que caso o 
            //arquivo nao exista, pode usar o '' no lugar
            fs.writeFile(`${arquivo.nome}.txt`, arquivo?.conteudo ?? '', 'utf-8', (erro) => {
                if (erro) {
                    console.log('Falha ao criar arquivo', erro);

                    res.statusCode = 500;

                    const resposta = {
                        erro: {
                            mensagem: `Falha ao criar arquivo ${arquivo.nome}`   
                        }
                    };
                    
                    res.end(JSON.stringify(resposta));

                    return;
                }

                res.statusCode = 201;

                const resposta = {
                    mensagem: `Arquivo ${arquivo.nome} criado com sucesso`
                };

                res.end(JSON.stringify(resposta));
                
                return;
            });
        });
        req.on('error', (erro) => {
            console.log('Falha ao processar a requisicao', erro);

            res.statusCode = 400;

            const resposta = {
                erro: {
                    mensagem: 'Falha ao processar a requisicao'
                }
            };

            res.end(JSON.stringify(resposta));

            return;
        });
        return;
    }

    if (req.method === 'PATCH' && req.url === '/arquivos') { // o design de apis define que deve ser no plural
        const corpo = []; 
        //listener de eventos
        req.on('data', (parte) => {
            corpo.push(parte);
        });

        req.on('end', () => {
            const arquivo = JSON.parse(corpo);
            
            res.statusCode = 400;

            if (!arquivo?.nome) {
                const resposta = {
                    erro: {
                        mensagem: `Atributo 'nome' nao foi encontrado, porem e obrigatorio para a atualizacao do arquivo`
                    }
                };

                res.end(JSON.stringify(resposta));

                return;
            }

            if (!arquivo?.conteudo) {
                const resposta = {
                    erro: {
                        mensagem: `Atributo 'conteudo' nao foi encontrado, porem e obrigatorio para a atualizacao do arquivo`
                    }
                };

                res.end(JSON.stringify(resposta));

                return;
            }

            fs.access(`${arquivo.nome}.txt`, fs.constants.W_OK, (erro) => {
                if (erro) {
                    console.log('Falha ao  acessar arquivo', erro);

                    res.statusCode = erro.code === 'ENOENT' ? 404 : 403;

                    const resposta = {
                        erro: {
                            mensagem: `Falha ao acessar arquivos ${arquivo.nome}`
                        }
                    };

                    res.end(JSON.stringify(resposta));

                    return;
                }
                //Operador ? acessa a referencia do arquivo, 
                // no caso do conteudo foi usado?? para dizer ao node que caso o 
                //arquivo nao exista, pode usar o '' no lugar
                fs.appendFile(`${arquivo.nome}.txt`, `\n${arquivo?.conteudo}` ?? '', 'utf-8', (erro) => {
                if (erro) {
                    console.log('Falha ao atualizar arquivo', erro);

                    res.statusCode = 500;

                    const resposta = {
                        erro: {
                            mensagem: `Falha ao atualizar arquivo ${arquivo.nome}`   
                        }
                    };
                    
                    res.end(JSON.stringify(resposta));

                    return;
                }

                res.statusCode = 200;

                const resposta = {
                    mensagem: `Arquivo ${arquivo.nome} atualizado com sucesso`
                };

                res.end(JSON.stringify(resposta));
                
                return;
               });
            });
        });
        req.on('error', (erro) => {
            console.log('Falha ao processar a requisicao', erro);

            res.statusCode = 400;

            const resposta = {
                erro: {
                    mensagem: 'Falha ao processar a requisicao'
                }
            };

            res.end(JSON.stringify(resposta));

            return;
        });
        return;
    }

    res.statusCode = 404;

    const resposta = {
        erro: {
            mensagem: 'rota nao encontrada',
            url: req.url
        }
    };

    res.end(JSON.stringify(resposta));
}