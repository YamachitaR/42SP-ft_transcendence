# Introdução 


Esse projeto é proposto pela [42SP](https://www.42sp.org.br/).  
 
## Objetivo do Projeto

O objetivo principal é criar uma plataforma online para o jogo Pong, que permita partidas em tempo real entre jogadores, com um enfoque em um site que ofereça uma experiência de usuário fluida e moderna. O projeto é desafiador e incentiva a inovação e a exploração de novas técnicas e tecnologias dentro do escopo especificado.

## Requisitos Básicos

Desenvolvimento do Site:

- O site deve ser uma Aplicação de Página Única (SPA).
- Deve ser desenvolvido com JavaScript puro para o frontend e, opcionalmente, Ruby puro para o backend, a menos que módulos específicos permitam o uso de outras tecnologias.
- Deve ser compatível com a versão mais recente do Google Chrome.
- O site deve estar seguro contra ataques de SQL Injection e XSS, e usar HTTPS para todas as comunicações.
- O site deve ter a capacidade de se inscrever e logar usuários de forma segura. 


Implementação do Jogo:

- O jogo Pong deve ser jogável diretamente no site e permitir partidas entre dois jogadores usando o mesmo teclado.
- Deve ser possível iniciar e participar de torneios, com um sistema de matchmaking para organizar as partidas.
- O jogo deve ser intuitivo, com controles claros e sem falhas críticas.



## Equipe 

- Emerson: [GitHub](https://github.com/D4rkSantana) [Linkedin](https://www.linkedin.com/in/emerson-santana-272752262/)

- Lucas: [GitHub](https://github.com/APONTES19) [Linkedin](https://www.linkedin.com/in/apontes19/)

- Ricardo: [GitHub](https://github.com/YamachitaR) [Linkedin](https://www.linkedin.com/in/ricardo-yamachita/)


# Rodar o programa

## Pré-requisito: 

- Docker Compose


## .env

Precisamos ter o arquivo `.env` na raiz do projeto: 

~~~
SECRET_KEY=<chave do Django>

POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_DB=pong
POSTGRES_HOST=postgres
POSTGRES_PORT=5432

# Essa chave só consegue quem é aluno da 42
# Serve para logar com a conta da 42
EXTERNAL_API_CLIENT_ID= <chave da intra>
EXTERNAL_API_CLIENT_SECRET=<chave da intra>
~~~

A chave da Intra só consegue quem é aluno da 42: [https://api.intra.42.fr/apidoc](https://api.intra.42.fr/apidoc)


## Let's go!

Agora dá um `make` esperar a magia acontecer. 

Após o termino, entre no `localhost`.