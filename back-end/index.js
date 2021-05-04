const express = require('express');
const cors = require('cors');
const userRoute = require('./src/routes/userRoute');
require('dotenv').config();
 
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.use(cors());

app.use(userRoute);

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});
