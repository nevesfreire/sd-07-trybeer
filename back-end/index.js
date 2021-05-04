const express = require('express');
const cors = require('cors');

const login = require('./routes/loginRoute');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use('/login', login);

app.listen(PORT, () => {
    console.log(`listening on ${PORT} `);
});