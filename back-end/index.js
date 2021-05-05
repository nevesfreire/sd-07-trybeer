const express = require('express');
const cors = require('cors');

const PORT = 3001;

const router = require('./router/usersRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/user', router);

app.listen(PORT, () => {
  console.log('Servidor iniciado');
});