<p align="center">
  <img src=".github/capa-ignite-nodejs.png" alt="Ignite Node.js">
</p>

<br>

<h1 align="center">
  Ignite - Trilha Node.js

  <br>

  Desafio 02 - Daily Diet API
</h1>

<br>

<p align="center">
  <img
    src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"
    alt="Node.js"
  >
  <img
    src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"
    alt="TypeScript"
  >
  <img
    src="https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white"
    alt="SQLite"
  >
</p>

<br>

### :hammer_and_wrench: Tecnologias
- [Node.js](https://nodejs.org/en)
- [TipeScript](https://www.typescriptlang.org/)
- [Knex](https://knexjs.org/guide/)
- [SQLite](https://www.sqlite.org/index.html)

### :fire: Execução do projeto
  1. Instalação das dependências:
     ```
     npm i -f
     ```
  2. Build:
     ```
     npm run build
     ```
  3. Migrations:
     ```
     npm run knex -- migrate:latest
     ```
  4. Execução:
     ```
     npm start
     ```

### :link: Rotas
#### Usuários
  - `POST/user`
    <p>
      Cria um novo usuário e adicona um cookie para "autenticação"
    </p>

#### Refeições
  - `POST/snacks`
    <p>
      Cria uma nova refeição
    </p>
  - `GET/snacks`
    <p>
      Lista todas as refeições
    </p>
  - `GET/snacks/{id}`
    <p>
      Lista uma refeição de acordo com o ID
    </p>
  - `DELETE/snacks/{id}`
    <p>
      Remove uma refeição de acordo com o ID
    </p>
  - `PATCH/snacks/{id}`
    <p>
      Atualiza uma refeição de acordo com o ID
    </p>
  - `GET/snack/metricks`
    <p>
      Lista as métricas do usuário (quantidade das refeições registradas, quantidade das refeições dentro/fora da dieta e a melhor sequência das refeições dentro da dieta)
    </p>
