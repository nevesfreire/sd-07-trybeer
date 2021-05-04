const express = require('express');
const cors = require('cors');

const loginRoute = require('./src/routes/loginRoute');
const errorMiddleware = require('./src/middleware/error');

const app = express();

app.use(cors());
app.use(express.json());

app.use(loginRoute);

app.use(errorMiddleware);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
