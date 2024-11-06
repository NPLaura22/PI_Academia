// IMPORTAR MÓDULO EXPRESS
const express = require('express');

// IMPORTAR MÓDULO MYSQL
const mysql = require('mysql2');

// APP - OBJETO COM CARACTERÍSTICAS DO MÓDULO EXPRESS
const app = express();

// CONFIGURAÇÃO DE CONEXÃO
const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'NPL_BD*81(PEDRO)',
    database: 'BodyCode'
});

// TESTE DE CONEXÃO
conexao.connect(function(erro) {
    // parâmetro 'erro' - retorna o motivo da falha da conexão
    if (erro) throw erro;
    console.log('Conexão efetuada com sucesso!');
});

// Middleware para analisar o corpo das requisições
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Exporta a conexão para ser usada em outros arquivos
module.exports = conexao;