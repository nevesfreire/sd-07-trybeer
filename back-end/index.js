const express = require('express');
const cors = require('cors');
const login = require('./routes/login');
const register = require('./routes/register');
const products = require('./routes/products');

const app = express();

const PORT = 3001;

app.use(express.json()); // Reconhecer o body do "request"
app.use(cors());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(login);
app.use(register);
app.use(products);

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});