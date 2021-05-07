const express = require('express');
const { login, user, image, product } = require('./routes');

require('dotenv').config();

const app = express();
app.use(express.json());

const { PORT } = 3001;

app.use(login);
app.use(user);
app.use(image);
app.use(product);

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
