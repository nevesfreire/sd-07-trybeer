const express = require('express');
const cors = require('cors');
const path = require('path');
const route = require('./routes');
const { errorMiddleware } = require('./middlewares');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/login', route.loginRoute);
app.use('/products', route.productRoute);
app.use('/orders', route.ordersRoute);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`API started in port ${PORT}`));
