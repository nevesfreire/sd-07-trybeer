const express = require('express');
const { validadeToken } = require('../middlewares/productsMiddleware');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/products', validadeToken, productsController.requireProducts);

module.exports = router;
