const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { UsersRouters, ProductsRouters, OrdersRouters } = require('./routes');
const { ErrorMiddleware, AuthMiddleware } = require('./middlewares');

const { validateToken } = AuthMiddleware;

const app = express();
const PORT = process.env.PORT || 3001;

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.json());
app.use(cors());

app.use(UsersRouters);
app.use(validateToken);
app.use(ProductsRouters);
app.use(OrdersRouters);
app.use(ErrorMiddleware);

app.listen(PORT, () => {
  console.log(`Grupo 09 na porta ${PORT}`);
});
