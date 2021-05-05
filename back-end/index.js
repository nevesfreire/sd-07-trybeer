require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { RegisterRoute } = require('./routes');

const port = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());

app.use(RegisterRoute);

app.listen(port, () => {
  console.log(`Server inicializado na porta ${port}`);
});
