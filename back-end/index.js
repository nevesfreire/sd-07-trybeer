const express = require('express');
const login = require('./src/routes/loginRoute');

const PORT = 3001;

const app = express();
app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use(login);

app.listen(PORT, () => { console.log('API rodando na porta 3001'); });
