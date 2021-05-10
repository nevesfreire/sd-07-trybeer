const express = require('express');
const checkToken = require('./middleware/checkToken');

const router = express.Router();

const userController = require('./controller/UserController');
const productsControler = require('./controller/ProductController');
const saleControler = require('./controller/SaleController');

router.post('/user', userController.create);
// Recebe "name" no body e atualiza o nome do usuário. (Requer Token)
router.post('/updateUserName', checkToken, userController.updateUserName);

// Recebe "email" e "passowrd" através do body e recebe o token.
router.post('/login', userController.login);

router.get('/products', productsControler.getAllProducts);

// Cria uma nova venda. (Requer Token) - Será usado no req. 6
// Estrutura do body da requisição: 
// {
// "deliveryAddress":"Rua Leopardo Gazela",
// "deliveryNumber":"25",
// "listProducts": {"1":"5","2":"5"}
// }
router.post('/sale', saleControler.create);

// Listagem com todas as vendas.
router.get('/sale', saleControler.getReallyAll);

// Busca uma venda especifica atraves do id a venda.
router.get('/sale/:id', saleControler.getById);

router.get('/orders', saleControler.getAll);
// O "total_price" é o valor total do pedido
router.get('/orders/:numeroDoPedido', saleControler.getByNumber); 
router.get('/admin/orders', saleControler.getAllOrders);

module.exports = router;
