const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { user } = require('./resources');

const app = express();
app.use(cors());
app.use(express.json());

app.use(user);

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Online, Ouvindo porta ${PORT}!`);
});
