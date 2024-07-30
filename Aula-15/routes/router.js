import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import users from './users.js';
const router = express.Router();

// Adicionando usuários ao banco de dados
router.post('/', (req, res) => {
    try {
        const user = req.body;
        users.push({ ...user, id: uuidv4() });
        res.status(201).send(`O usuário ${user.first_name} foi adicionado ao banco de dados!`);

    } catch {
        res.status(500).json({ message: 'Erro no servidor, tente novamente!' })
    }

})

// Obtendo a lista de usuários do banco de dados simulado
router.get('/', (req, res) => {
    res.json(users);
})

// Obtendo um usuário específico do banco de dados
router.get('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const foundUser = users.find((user) => user.id === id);
        if (foundUser === undefined) {
            return res.status(404).send('Usuário não encontrado!');
        }
        res.status(200).send(foundUser);

    } catch {
        res.status(500).json({ message: 'Erro no servidor, tente novamente!' })
    }
});

// Deletando um usuário
router.delete('/:id', (req, res) => {
    try {
        const user = users.findIndex(indice => indice.id === (req.params.id));
        if (user === -1) {
            return res.status(404).send('Usuário não encontrado!');
        }
        users.splice(user, 1);
        res.status(200).send(`Usuário excluído com sucesso!`);

    } catch {
        res, status(500).json({ message: 'Erro no servidor, tente novamente!' })
    }
});

// Editando dados parciais do usuário
router.patch('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, email } = req.body;
        const user = users.find((user) => user.id === id);

        if (first_name) user.first_name = first_name;
        if (last_name) user.last_name = last_name;
        if (email) user.email = email;

        res.send(`Usuário ${user.first_name} foi atualizado!`)

    } catch {
        res.status(500).json({ message: 'Erro no servidor, tente novamente!' })
    }
});

export default router