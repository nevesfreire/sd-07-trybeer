const express = require('express');
const login = require('./routes/Login');

require('dotenv').config();

const app = express();

const { PORT } = process.env;

app.use(login);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));