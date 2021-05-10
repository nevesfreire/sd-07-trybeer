const express = require('express');
const cors = require('cors');
const router = require('./Routes/ClientRoutes');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => console.log('rodando na porta 3001'));