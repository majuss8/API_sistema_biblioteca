const pool = require("../conexao");

const cadastrarAutor = async (req, res) => {
    const { nome, idade } = req.body;

    try {
        if (!nome) {
            return res.status(400).json({
                mensagem: "O campo nome é obrigatório.",
            });
        }

        const query = `insert into autores (nome, idade) values ($1, $2) returning *`;
    
        const { rows } = await pool.query(query, [nome, idade]);
    
        const { ...autor } = rows[0];
    
        return res.status(201).json(autor);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}

const buscarAutor = async (req, res) => {
    const { id } = req.params;

    try {
        const { rows, rowCount } = await pool.query(
            `select autores.id, 
            autores.nome, 
            autores.idade, 
            livros.id as livro_id, 
            livros.nome as livro_nome, 
            livros.genero, 
            livros.editora, 
            livros.data_publicacao from autores 
            left join livros on autores.id = livros.autor_id where autores.id = $1`,
            [id]
        );

        if (rowCount < 1) {
            return res.status(404).json({ mensagem: "Autor não encontrado" });
        }

        const autor = {
            id: rows[0].id,
            nome: rows[0].nome,
            idade: rows[0].idade
        };

        let resposta
        if (rows[0].livro_id === null) {
            const mensagem = "O autor não há livros registrados"
            resposta = { ...autor, livros: mensagem }
            return res.json(resposta)
        }

        const livros = rows.map(row => {
            return {
                id: row.livro_id,
                nome: row.livro_nome,
                genero: row.genero,
                editora: row.editora,
                data_publicacao: new Date(row.data_publicacao).toISOString().split('T')[0]
            };
        });

        resposta = { ...autor, livros: livros };

        return res.json(resposta);

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}

module.exports = {
    cadastrarAutor,
    buscarAutor
}