const { Router } = require('express');
const { loginController } = require('../controllers');

const loginRoute = Router();

// Login
loginRoute.post('/', loginController.signIn);

// Cadastro
loginRoute.post('/register', loginController.signUp);

// Atualizar Usuario
loginRoute.put('/register', loginController.updateUser);

module.exports = loginRoute;