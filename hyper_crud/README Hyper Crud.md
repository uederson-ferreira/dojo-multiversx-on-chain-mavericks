# CRUD com Hyper em Rust

Este projeto é um exemplo simples de um CRUD (Create, Read, Update, Delete) utilizando Rust, Hyper, Tokio, e Serde para gerenciar registros (ex.: pessoas). O projeto utiliza um único arquivo (`src/main.rs`) e armazena os dados em memória com um `HashMap`.

## Estrutura do Projeto

A estrutura do projeto criado com o comando `cargo new` é:

```
nome_do_projeto/
├── Cargo.toml
└── src/
    └── main.rs
```

## Pré-requisitos

- [Rust e Cargo](https://www.rust-lang.org/tools/install) instalados.
- Conhecimento básico de terminal/linha de comando.

## Compilação e Execução

Para compilar e rodar o servidor, execute:

```bash
cargo run
```

Você verá uma mensagem indicando que o servidor está rodando, por exemplo:

```
Servidor rodando em http://127.0.0.1:3000
```

## Testando as Rotas do CRUD

Você pode testar as rotas utilizando o `curl` ou ferramentas como [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/).

### 1. Criar uma Pessoa (POST /person)

Cria um novo registro de pessoa. Exemplo:

```bash
curl -X POST -H "Content-Type: application/json" \
     -d '{"nome": "João", "idade": 30}' \
     http://127.0.0.1:3000/person
```

### 2. Listar Todas as Pessoas (GET /person)

Retorna todos os registros existentes em formato JSON:

```bash
curl http://127.0.0.1:3000/person
```

### 3. Obter uma Pessoa pelo ID (GET /person/{id})

Supondo que o ID do registro seja `1`:

```bash
curl http://127.0.0.1:3000/person/1
```

### 4. Atualizar uma Pessoa (PUT /person/{id})

Atualiza os dados do registro com ID `1`:

```bash
curl -X PUT -H "Content-Type: application/json" \
     -d '{"nome": "João Silva", "idade": 31}' \
     http://127.0.0.1:3000/person/1
```

### 5. Deletar uma Pessoa (DELETE /person/{id})

Remove o registro com ID `1`:

```bash
curl -X DELETE http://127.0.0.1:3000/person/1
```

## Considerações Finais

Este exemplo demonstra como criar um servidor HTTP simples com suporte a operações CRUD utilizando armazenamento em memória. Para aplicações em produção, recomenda-se utilizar um banco de dados persistente e implementar mecanismos adequados de tratamento de erros e segurança.