const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { user, auth } = require('./resources');

const app = express();
app.use(cors());
app.use(express.json());

app.use(user.route);
app.use(auth.route);

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Online, Ouvindo porta ${PORT}!`);
});
