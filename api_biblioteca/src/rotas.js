const express = require("express");
const { cadastrarAutor, buscarAutor } = require("./controladores/autores");
const { cadastrarLivro, listarLivros } = require("./controladores/livros");
const rotas = express();

rotas.post("/autor", cadastrarAutor);
rotas.post("/autor/:id/livro", cadastrarLivro);
rotas.get("/livro", listarLivros)
rotas.get("/autor/:id", buscarAutor);

module.exports = rotas;