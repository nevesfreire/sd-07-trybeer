const express = require('express');
const cors = require('cors');
const path = require('path'); 
const userRoute = require('./src/routes/userRoute');
const productRoute = require('./src/routes/productRoute');
const saleRoute = require('./src/routes/saleRoute');
require('dotenv').config();
 
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.join(__dirname, 'uploads'))); 

app.use(express.json());

app.use(cors());

app.use(userRoute);
app.use(productRoute);
app.use(saleRoute);

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});
