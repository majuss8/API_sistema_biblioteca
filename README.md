## Api para sistemas de Biblioteca

É um projeto de uma Api para um sistema de bibliotecas. 

A API conecta-se com um banco de dados [postgreSQL](https://www.postgresql.org/) chamado `biblioteca` e todo código de criação das tabelas está no arquivo `dump.sql`
No projeto utilizei pacotes npm e o framework [Express](https://expressjs.com/pt-br/) para o desenvolvimento.
Testei e documentei as rotas usando o [Insomnia](https://insomnia.rest/).
E para o gerenciamento do banco de dados utilizei o [Beekeeper Studio](https://www.beekeeperstudio.io/)

A Tabela chamada `autores` contém as seguintes características:

- Um identificador único do autor como chave primaria e auto incremento;
- O nome (obrigatório)
- A idade

![image](https://github.com/majuss8/API_sistema_biblioteca/assets/127978188/aa31a1c8-6c2c-4d76-99a2-51da7f4bfb05)

A tabela chamada `livros` contém as seguintes características:

- Um identificador único do livro como chave primaria e auto incremento;
- O nome (obrigatório)
- O genero
- A editora
- A data de publicação no formato `YYYY-MM-DD`
- O identificador do autor responsável pelo livro

![image](https://github.com/majuss8/API_sistema_biblioteca/assets/127978188/c7e9ea57-7a77-4014-8d63-d2a289049e2d)

1 - Funcionalidade de cadastrar um autor no banco de dados com as seguintes especificações:

`POST /autor`

Exemplo de entrada

```
{
    "nome": "Maria Júlia",
    "idade": 18
}
```

Exemplo de saída

```
{
    "id": 1,
    "nome": "Maria Júlia",
    "idade": 18
}
```

ou

```
{
    "mensagem": "o campo nome é obrigatório."
}
```

![image](https://github.com/majuss8/API_sistema_biblioteca/assets/127978188/5ebfd06e-a764-4bdd-b7d6-452b623e76d8)


2 - Funcionalidade de buscar um autor cadastrado no banco de dados, com sua lista de livros cadastrados, através do seu identificador único com as seguintes especificações:

`GET /autor/:id`

Exemplo de saída

```
{
    "id": 2,
    "nome": "Victor Hugo",
    "idade": 73,
    "livros": [
        {
            "id": 2,
            "nome": "Os Miseráveis",
            "genero": "Romance",
            "editora": "A. Lacroix, Verboeckhoven & Ce.",
            "data_publicacao": "1862-04-03"
        },
        {
            "id": 3,
            "nome": "O’corcunda de Notre-Dame",
            "genero": "Romance",
            "editora": "Scipione",
            "data_publicacao": "1831-03-01"
        }
    ]
}
```

ou

```
{
    "mensagem": "Autor não encontrado"
}
```

![image](https://github.com/majuss8/API_sistema_biblioteca/assets/127978188/f0897d54-8c58-4d46-9184-357c1345e8e6)

3 - Funcionalidade de cadastrar um livro para um autor no banco de dados com as seguintes especificações:

`POST /autor/:id/livro`

Exemplo de entrada

```
{
	"nome": "Lógica de Programação",
	"genero": "Programação",
	"editora": "Casa do Código",
	"data_publicacao": "2014-04-16"
}
```

Exemplo de saída

```
{
	"id": 1,
	"nome": "Lógica de Programação",
	"genero": "Programação",
	"editora": "Casa do Código",
	"data_publicacao": "2014-04-16"
}
```

ou

```
{
    "mensagem": "o campo nome é obrigatório."
}
```

![image](https://github.com/majuss8/API_sistema_biblioteca/assets/127978188/3e5f552c-3406-4b03-8bcc-56ebd02f4a95)

4 - Funcionalidade de listar os livros cadastrados no banco de dados, com as informações do seu autor, com as seguintes especificações:

`GET /livro`

Exemplo de saída

```
[
    {
        "id": 1,
        "nome": "Lógica de Programação",
        "genero": "Programação",
        "editora": "Casa do Código",
        "data_publicacao": "2014-04-16"
        "autor": {
            "id": 3,
            "nome": "Paulo Silveira",
            "idade": 38
        }
    },
    {
        "id": 2,
        "nome": "Os Miseráveis",
        "genero": "Romance",
        "editora": "A. Lacroix, Verboeckhoven & Ce.",
        "data_publicacao": "1862-04-03",
        "autor": {
            "id": 2,
            "nome": "Victor Hugo",
            "idade": 73
        }
    },
    {
        "id": 3,
        "nome": "O’corcunda de Notre-Dame",
        "genero": "Romance",
        "editora": "Scipione",
        "data_publicacao": "1831-03-01",
        "autor": {
            "id": 2,
            "nome": "Victor Hugo",
            "idade": 73
        }
    }
]
```

ou

```
{
    "mensagem": "Não há livros registrados"
}
```

![image](https://github.com/majuss8/API_sistema_biblioteca/assets/127978188/c77eaec7-f97e-45c0-ae83-ffa5105bab56)


#### tags: `lógica` `banco de dados` `sql` `postgres`
