const express = require('express');
const login = require('./routes/loginRoute');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/login', login)

app.listen(PORT, () => {
    console.log(`listening on ${PORT} `);
});