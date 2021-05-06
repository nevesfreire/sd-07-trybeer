const express = require('express');
const login = require('./routes/login');
const register = require('./routes/register');

const app = express();

const PORT = 3000;

app.use(express.json()); // Reconhecer o body do "request"

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(login);
app.use(register);

app.listen(PORT, () => {
  console.log('API rodando na porta 3000');
});