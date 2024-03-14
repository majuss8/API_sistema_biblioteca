## Implementação de Api para sistemas de Biblioteca

É um projeto de uma Api para um sistema de bibliotecas. 

A API conecta-se com um banco de dados `postgreSQL` chamado `biblioteca` e todo código de criação das tabelas está no arquivo `dump.sql`

A Tabela chamada `autores` contém as seguintes características:

- Um identificador único do autor como chave primaria e auto incremento;
- O nome (obrigatório)
- A idade

A tabela chamada `livros` contém as seguintes características:

- Um identificador único do livro como chave primaria e auto incremento;
- O nome (obrigatório)
- O genero
- A editora
- A data de publicação no formato `YYYY-MM-DD`
- O identificador do autor responsável pelo livro

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

2 - Funcionalidade de buscar um autor cadastrado no banco de dados, com sua lista de livros cadastrados, através do seu identificador único com as seguintes especificações:

`GET /autor/:id`

Exemplo de saída

```
{
    "id": 1,
    "nome": "Victor Hugo",
    "idade": 73,
    "livros": [
        {
            "id": 1,
            "nome": "Os Miseráveis",
            "genero": "Romance",
            "editora": "A. Lacroix, Verboeckhoven & Ce.",
            "data_publicacao": "1862-04-03"
        },
        {
            "id": 2,
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
	"id": 3,
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

4 - Funcionalidade de listar os livros cadastrados no banco de dados, com as informações do seu autor, com as seguintes especificações:

`GET /livro`

Exemplo de saída

```
[
    {
        "id": 1,
        "nome": "Os Miseráveis",
        "genero": "Romance",
        "editora": "A. Lacroix, Verboeckhoven & Ce.",
        "data_publicacao": "1862-04-03",
        "autor": {
            "id": 1,
            "nome": "Victor Hugo",
            "idade": 73
        }
    },
    {
        "id": 2,
        "nome": "O’corcunda de Notre-Dame",
        "genero": "Romance",
        "editora": "Scipione",
        "data_publicacao": "1831-03-01",
        "autor": {
            "id": 1,
            "nome": "Victor Hugo",
            "idade": 73
        }
    },
    {
        "id": 3,
        "nome": "Lógica de Programação",
        "genero": "Programação",
        "editora": "Casa do Código",
        "data_publicacao": "2014-04-16"
        "autor": {
            "id": 2,
            "nome": "Paulo Silveira",
            "idade": 38
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

#### tags: `lógica` `banco de dados` `sql` `postgres`
