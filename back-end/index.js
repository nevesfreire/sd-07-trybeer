const express = require('express');
const cors = require('cors');

const PORT = 3001;

const userRouter = require('./router/usersRoutes');
const productsRouter = require('./router/productsRouter');
const saleRouter = require('./router/salesRoutes');

const app = express();

app.use('/images', express.static(`${__dirname}/images`));
app.use(cors());
app.use(express.json());

app.use('/user', userRouter);
app.use('/products', productsRouter);

app.use('/sales', saleRouter);

app.listen(PORT, () => {
  console.log('Servidor iniciado');
});