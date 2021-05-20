const express = require('express');

require('dotenv/config');

const PORT = process.env.PORT || 3001;

const routes = require('./routes');

const app = express();
app.use(express.json());
app.use(routes);

app.listen(PORT, () => { console.log(`API rodando na porta: ${PORT}`); });
