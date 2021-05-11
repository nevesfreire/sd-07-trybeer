const { Router } = require('express');
const { loginController } = require('../controllers');

const loginRoute = Router();

// Login
loginRoute.post('/', loginController.signIn);

// Cadastro
loginRoute.post('/register', loginController.signUp);

module.exports = loginRoute;