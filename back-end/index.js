const express = require('express');
const login = require('./src/routes/loginRoute');
const register = require('./src/routes/registerRoute');

const PORT = 3001;

const app = express();
app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use(login);
app.use(register);

app.listen(PORT, () => { console.log('API rodando na porta 3001'); });
