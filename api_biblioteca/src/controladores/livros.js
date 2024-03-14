const pool = require("../conexao");

const cadastrarLivro = async (req, res) => {
    const { id } = req.params;
    const { nome, genero, editora, data_publicacao } = req.body;

    try {
        if (!nome) {
            return res.status(400).json({
                mensagem: "O campo nome é obrigatório.",
            });
        }

        const { rows } = await pool.query(`select id from autores where id = $1`, [id]);
    
        if (rows.length === 0) {
            return res.status(404).json({ mensagem: "Autor não encontrado" });
        }

        const idAutor = rows[0].id;

        const query = `insert into livros (nome, genero, editora, data_publicacao, autor_id) values ($1, $2, $3, $4, $5) returning *`;
    
        const livro = await pool.query(query, [nome, genero, editora, data_publicacao, idAutor]);
    
        const { autor_id, data_publicacao: dataPublicacaoCompleta, ...livroSemAutorId } = livro.rows[0];

        const dataPublicacao = new Date(dataPublicacaoCompleta).toISOString().split('T')[0];
                
        return res.status(201).json({ ...livroSemAutorId, data_publicacao: dataPublicacao });

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

const listarLivros = async (req, res) => {
    try {
        const { rows } = await pool.query(
            `select autores.id, 
            autores.nome, 
            autores.idade, 
            livros.id as livro_id, 
            livros.nome as livro_nome, 
            livros.genero, 
            livros.editora, 
            livros.data_publicacao from autores 
            left join livros on autores.id = livros.autor_id`
        );
            
        if (rows.length === 0) {
            const resposta = { mensagem: "Não há livros registrados" }
            return res.json(resposta)
        }

        const livros = rows.filter(row => row.livro_id !== null).map(row => {
            return {
                id: row.livro_id,
                nome: row.livro_nome,
                genero: row.genero,
                editora: row.editora,
                data_publicacao: new Date(row.data_publicacao).toISOString().split('T')[0],
                autor: {
                    id: row.id,
                    nome: row.nome,
                    idade: row.idade
                }
            };
        });

        return res.json(livros)
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

module.exports = {
    cadastrarLivro,
    listarLivros
}