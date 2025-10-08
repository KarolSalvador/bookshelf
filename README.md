# Book Shelf
> Projeto de conclusão do Programa Desenvolve - O Boticário
> Aplicação web para gerenciamento de biblioteca pessoal chamada BookShelf. A aplicação permitirá aos usuários catalogar, organizar e acompanhar o progresso de leitura de seus livros.

## 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando uma stack moderna e performática:

-   **[Next.js](https://nextjs.org/)** - Framework React para produção.
-   **[React](https://reactjs.org/)** - Biblioteca para construção de interfaces de usuário.
-   **[Prisma](https://www.prisma.io/)** - ORM de última geração para Node.js e TypeScript.
-   **[SQLite](https://www.sqlite.org/index.html)** - Banco de dados SQL leve e baseado em arquivo.
-   **[TypeScript](https://www.typescriptlang.org/)** (Opcional, mas comum em projetos Next.js) - Superset do JavaScript que adiciona tipagem estática.

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de que você tem as seguintes ferramentas instaladas em sua máquina:

-   [Node.js](https://nodejs.org/) (versão LTS recomendada)
-   [Git](https://git-scm.com/)
-   Um editor de código de sua preferência (ex: [VS Code](https://code.visualstudio.com/))

---

## ⚙️ Como Rodar o Projeto Localmente

Siga os passos abaixo para configurar e executar o projeto em seu ambiente de desenvolvimento.

1.  **Clone o repositório**
    ```bash
    git clone https://github.com/KarolSalvador/bookshelf.git
    ```

2.  **Navegue até a pasta do projeto**
    ```bash
    cd bookshelf
    ```

3.  **Instale todas as dependências**
    O comando abaixo irá ler o arquivo `package.json` e instalar todos os pacotes necessários.
    ```bash
    npm install
    ```

4.  **Configure as variáveis de ambiente**
    O projeto precisa de um arquivo `.env` para gerenciar a conexão com o banco de dados.
    -   Procure por um arquivo chamado `.env.example` na raiz do projeto.
    -   Faça uma cópia dele e renomeie para `.env`.
    ```bash
    cp .env.example .env
    ```
    *Se o arquivo `.env.example` não existir, crie um novo arquivo chamado `.env` e adicione o seguinte conteúdo:*
    ```env
    DATABASE_URL="file:./dev.db"
    ```

5.  **Aplique as migrações do banco de dados**
    Este comando irá usar o Prisma para ler o schema, criar o arquivo de banco de dados SQLite (`dev.db`) e gerar o Prisma Client.
    ```bash
    npx prisma migrate dev
    ```

6.  **Inicie o servidor de desenvolvimento**
    Agora você pode rodar a aplicação!
    ```bash
    npm run dev
    ```

7.  **Acesse a aplicação**
    Abra seu navegador e acesse [http://localhost:3000](http://localhost:3000) para ver o projeto em execução.

---

## 📦 Scripts Disponíveis

No diretório do projeto, você pode executar vários scripts:

-   `npm run dev`: Inicia a aplicação em modo de desenvolvimento.
-   `npm run build`: Compila a aplicação para o ambiente de produção.
-   `npm run start`: Inicia um servidor de produção (requer `npm run build` antes).
-   `npm run lint`: Executa o linter para verificar erros de padrão de código.

---

## 🗄️ Banco de Dados

Este projeto utiliza o Prisma para gerenciar o esquema do banco de dados.

-   O esquema principal está localizado em `prisma/schema.prisma`.
-   Para visualizar e interagir com os dados do banco de dados de forma gráfica durante o desenvolvimento, utilize o **Prisma Studio**:
    ```bash
    npx prisma studio
    ```
    Isso abrirá uma interface web no seu navegador para gerenciar os dados.

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.