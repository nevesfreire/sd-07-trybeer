const express = require('express');
const productController = require('../controllers/productsController');

const router = express.Router();

router.get('/images/:nameProduct', productController.getImagesProducts);

module.exports = router;
