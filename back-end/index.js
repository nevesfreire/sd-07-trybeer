const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { UsersRouters } = require('./routes');
const { ErrorMiddleware } = require('./middlewares');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use(UsersRouters);

app.use(ErrorMiddleware);

app.listen(PORT, () => {
  console.log(`Grupo 09 na porta ${PORT}`);
});
