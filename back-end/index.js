const express = require('express');
const { login, user, image } = require('./routes');

require('dotenv').config();

const app = express();
app.use(express.json());

const { PORT } = process.env;

app.use(login);
app.use(user);
app.use(image);

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
