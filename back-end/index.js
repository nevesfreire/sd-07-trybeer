require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { RegisterRoute, loginRoute, updateUser, allOrders, orderDetails } = require('./routes');

const port = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/register', RegisterRoute);
app.use('/login', loginRoute);
app.use('/profile', updateUser);
app.use('/orders', allOrders);
app.use('/orders', orderDetails);

app.listen(port, () => {
  console.log(`Server inicializado na porta ${port}`);
});