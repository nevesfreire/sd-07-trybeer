const express = require('express');
require('dotenv').config();

const routes = require('./Routes');

const app = express();
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
