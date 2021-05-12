const express = require('express');
const cors = require('cors');
const login = require('./routes/login');
const register = require('./routes/register');
const routes = require('./routes');
const profile = require('./routes/profile');
const products = require('./routes/products');


const app = express();

const PORT = 3001;

app.use(express.json()); // Reconhecer o body do "request"
app.use(cors());
app.use('/images', express.static('images')); 

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(login);
app.use(register);
app.use(routes.checkoutRoute);
app.use(profile);
app.use(products);

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
