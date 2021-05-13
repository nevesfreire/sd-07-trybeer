const express = require('express');
const cors = require('cors');
const { PORT } = require('./config/application');

const { user, auth, product, sale } = require('./resources');

const app = express();
app.use(cors());
app.use(express.json());

app.use(user.route);
app.use(auth.route);
app.use(product.route);
app.use(sale.route);

app.listen(PORT, () => {
  console.log(`Trybeer API ON and listen at ${PORT}!`);
});
