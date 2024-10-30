# **docker-app-backend**

> Aplicação backend feita utilizando a biblioteca NestJs, com persistência de dados usando o PostgreSQL.

## Link para a documentação:
<a href="https://documenter.getpostman.com/view/27433321/2s93z58PtP" target="_blank">Clique aqui para acessar a documentação da API!</a>

Para rodar a aplicação siga os passos a seguir:

### Rodando projeto para desenvolvimento no PowerShell | CMD
    docker compose up --build -d; docker compose --profile development --build -d

#### Rodando projeto para produção no PowerShell | CMD
    docker compose up --build -d; docker compose --profile production --build -d

##### TODO:
 - create JSDoc to all service functions and methods
