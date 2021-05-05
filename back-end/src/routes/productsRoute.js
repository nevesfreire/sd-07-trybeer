const express = require('express');
const rescue = require('express-rescue');

const productsController = require('../controllers/productsController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/products', rescue(productsController.getAllProducts));

module.exports = router;
