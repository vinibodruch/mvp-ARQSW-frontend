# Movie Watchlist — Front-end (React)

Interface web desenvolvida em React com Material UI para gerenciar uma lista pessoal de filmes.

## Tecnologias

- **React 18** + **Vite** (bundler)
- **Material UI v6** (componentes visuais)
- **Axios** (chamadas HTTP)
- **Nginx** (servidor estático no container)

## Pré-requisitos

- Docker e Docker Compose instalados
- Chave da [OMDb API](https://www.omdbapi.com/apikey.aspx) (gratuita)
- Os dois repositórios na mesma pasta pai (`mvp-ARQSW-backend` e `mvp-ARQSW-frontend`)

## Configuração

Edite o arquivo `.env` na raiz do projeto e substitua `sua_chave_aqui` pela sua chave da OMDb caso necessário. Porém, no `.env`, já existe uma chave configurada por questões de facilidade de avaliação.

### Como obter a chave da OMDb API

Caso a chave não funcione ou precise gerar uma nova:

1. Acesse https://www.omdbapi.com/apikey.aspx
2. Selecione o plano **FREE** (1.000 buscas/dia, sem custo)
3. Preencha nome e e-mail, clique em **Submit**
4. Acesse o e-mail recebido e clique no link de ativação
5. Copie a chave exibida e cole no `.env`

## Executar com Docker Compose

Todos os comandos devem ser rodados dentro da pasta `mvp-ARQSW-frontend`:

```bash
# Subir todos os serviços (frontend + backend + banco de dados)
docker compose up --build

# Rodar em segundo plano
docker compose up --build -d

# Parar os serviços
docker compose down

# Parar e remover o volume do banco de dados
docker compose down -v
```

Após subir, acesse: **http://localhost:3000**

## Estrutura de Serviços

| Serviço | Container | Porta |
|---|---|---|
| Front-end (Nginx) | movie_frontend | 3000 |
| Back-end (Go) | movie_backend | interno |
| Banco de Dados | movie_db | interno |

> O back-end e o banco de dados não expõem portas para o host. O Nginx faz proxy das chamadas `/api/*` para o container do back-end.
