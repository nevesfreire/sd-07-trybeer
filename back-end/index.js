const express = require('express');
const cors = require('cors');

const { userRoutes } = require('./routes');

require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use(cors());
app.use(userRoutes);

app.listen(PORT, () => {
  console.log(`Trybeer API listen on ${PORT}`);
});
