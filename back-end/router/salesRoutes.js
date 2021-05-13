const express = require('express');
const salesController = require('../controller/salesController');

const router = express.Router();

router.get('/:userId', salesController.getAllSalesController);
router.get('/details/:saleId', salesController.getDetailsByIdController);
router.get('/products/:saleId', salesController.getProductsBySaleIdController);
router.put('/status/', salesController.updateStatusBySaleIdController);
router.post('/createsale', salesController.createSale);

module.exports = router;
