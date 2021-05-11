const express = require('express');
const saleController = require('../controllers/saleController');
const validateJWT = require('../auth/validateJWT');

const router = express.Router();

router
  .route('/sales')
  .post(validateJWT, saleController.createSale)
  .put(validateJWT)  
  .get(validateJWT, saleController.getSales);

router
  .route('/sales/:orderNumber')
  .get(validateJWT, saleController.getSaleByNumber)
  .put(validateJWT, saleController.changeSaleStatus);

module.exports = router;
