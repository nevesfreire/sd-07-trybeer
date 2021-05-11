const cors = require('cors');
const express = require('express');
require('dotenv').config();

const routes = require('./Routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/images`));
app.use(routes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
