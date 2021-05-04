const express = require('express');

const app = express();
const port = 3001;
const cors = require('cors');

const LoginController = require('./controllers/LoginController');
const UserRegisterController = require('./controllers/RegisterUserController');

app.use(cors());
app.use(express.json());

app.post('/login', LoginController.login);
app.post('/register', UserRegisterController.registerUser);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
