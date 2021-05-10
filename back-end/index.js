const express = require('express');
const cors = require('cors');
const path = require('path');

const login = require('./routes/loginRoute');
const user = require('./routes/userRoute');
const product = require('./routes/productRoute');
const checkout = require('./routes/checkoutRoute');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded());
app.use('/images', express.static(path.join(__dirname, 'uploads/images')));


app.use('/login', login);
app.use('/user', user);
app.use('/products', product);
app.use('/checkout', checkout);

app.listen(PORT, () => {
    console.log(`listening on ${PORT} `);
});