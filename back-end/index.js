const express = require('express');

const errorMiddleware = require('./src/middleware/error');

const app = express();

app.use(express.json());



app.use(errorMiddleware);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
