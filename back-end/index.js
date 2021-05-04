const express = require('express');
const route = require('./controllers');

const app = express();

app.use(express.json());

app.use('/products', route.productRoute);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`API started in port ${PORT}`));
