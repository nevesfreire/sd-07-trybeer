const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cors());

app.use(routes);

// Não use process.env pra porta, o env não existe no remoto, só declare env pros lances do mysql do readme- Berilo
app.listen(3001, () => console.log('Rodando...'));
