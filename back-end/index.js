const express = require('express');
const cors = require('cors');
const products = require('./src/routes/productsRoute');
const sales = require('./src/routes/salesRoute');
const login = require('./src/routes/loginRoute');
const register = require('./src/routes/registerRoute');
const profile = require('./src/routes/profileRoute');
const orders = require('./src/routes/ordersRoute');

const PORT = 3001;

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (_request, response) => {
  response.send();
});

app.use(products);
app.use(sales);
app.use(login);
app.use(register);
app.use(profile);
app.use(orders);

app.listen(PORT, () => { console.log('API rodando na porta 3001'); });
