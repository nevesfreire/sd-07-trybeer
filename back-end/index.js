const express = require('express');

const app = express();
const port = 3001;
const cors = require('cors');

const LoginController = require('./controllers/LoginController');
const UserController = require('./controllers/UserController');
const ProductController = require('./controllers/ProductController');
// const OrderController = require('./controllers/OrderController');

app.use(cors());
app.use(express.json());

app.post('/login', LoginController.login);
app.post('/register', UserController.registerUser);
app.put('/profile', UserController.updateUserName);

app.get('/products', ProductController.getAllProducts);
app.get('/images/:filename', ProductController.getImages);

app.post('/checkout', UserController.registerOrder);
app.get('/orders', UserController.getAllOrders);
app.get('/orders/:id', UserController.getOrderDetailsById);

app.get('/admin/orders', UserController.getAllOrders);
app.get('/admin/orders/:id', UserController.getOrderDetailsById);

app.put('/admin/orders/:id', UserController.updateSale);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
