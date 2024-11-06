const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./app');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'src_front')));

// ENDPOINT PARA CADASTRO
app.post('/api/cadastro', (req, res) => {
    const { name, email, dob, cpf } = req.body;
    console.log('Dados recebidos:', { name, email, dob, cpf }); // Log dos dados recebidos

    const query = 'INSERT INTO USUARIOS (NOME, EMAIL, DATANASCIMENTO, CPF) VALUES (?, ?, ?, ?)';
    connection.query(query, [name, email, dob, cpf], (error, results) => {
        if (error) {
            console.error('Erro ao inserir no banco de dados:', error); // Log do erro
            return res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
        }
        res.status(200).json({ message: 'Cadastro realizado com sucesso!' });
    });
});

// ROTA PARA CARREGAR LOGIN
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src_front', 'login.html'));
});


// INICIALIZA SERVIDOR
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse a aplicação em http://localhost:${PORT}`);
});
