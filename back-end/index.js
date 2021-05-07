const express = require('express');
const cors = require('cors');

const app = express();
const routes = require('./routes');
require('dotenv').config();

const corsOptions = {
  origin: process.env.CORS_PORT_FRONT,
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));

const { PORT } = process.env || 3007;

app.use(express.json());
app.use('/', routes);
app.use('/login', routes);
app.use('/register', routes);

app.listen(Number(PORT), () => console.log(`Server run in port ${PORT}`));
