const express = require('express');
const { getAllProducts } = require('../controllers/products');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.route('/products')
  .get(validateToken, getAllProducts);

module.exports = router;
