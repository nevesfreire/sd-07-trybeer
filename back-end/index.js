require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const errorController = require('./controllers/errorController');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/', (request, response) => {
  response.send();
});

app.use('/', routes);

app.use(errorController);

app.listen(PORT, () => { console.log(`API rodando na porta ${PORT}`); });
