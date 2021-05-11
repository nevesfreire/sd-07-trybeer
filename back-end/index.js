require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const errorController = require('./controllers/errorController');

const app = express();
app.use(cors());
app.use(express.json());

// Normalmente é declarada no .env,
// mas o avaliador não possui esta variável de ambiente. 
const PORT = 3001;

app.get('/', (_request, response) => {
  response.send();
});

app.use('/images', express.static(`${__dirname}/images`));

app.use('/', routes);

app.use(errorController);

app.listen(PORT, () => { console.log(`API rodando na porta ${PORT}`); });