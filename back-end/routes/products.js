const express = require('express');
const { getAllProducts, getProductById } = require('../controllers/products');

const router = express.Router();

router.route('/products')
  .get(getAllProducts);

router.route('/products/:id')
  .get(getProductById);

module.exports = router;