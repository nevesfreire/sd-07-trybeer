const express = require('express');
const cors = require('cors'); 

const app = express();
app.use(cors());
app.use(express.json());

const { PORT } = process.env;

// app.use(router);

app.listen(PORT, () => { console.log(`Online, Ouvindo porta ${PORT}!`); });