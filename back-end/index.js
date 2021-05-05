const express = require('express');

const app = express();
const routes = require('./routes');
require('dotenv').config();

const { PORT } = process.env;

app.use(express.json());
app.use('/', routes);
app.use('/login', routes);

app.listen(Number(PORT), () =>
  console.log(`Server run in port ${PORT}`));
