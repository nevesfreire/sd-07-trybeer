const express = require('express');
const cors = require('cors');

const router = require('./router/usersRoutes');

const app = express();
const PORT = 3001;

app.use(cors);
app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log('Servidor iniciado');
});