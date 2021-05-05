require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const errorController = require('./controllers/errorController');

const app = express();
app.use(express.json());

const { PORT } = process.env;

app.get('/', (request, response) => {
  response.send();
});

app.use('/', routes);

app.use(errorController);

app.listen(PORT, () => { console.log(`API rodando na porta ${PORT}`); });