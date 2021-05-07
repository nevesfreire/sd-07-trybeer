const express = require('express');
const cors = require('cors');
const { saleController } = require('../controllers');
const validateTokenMiddleware = require('../middlewares/validateTokenMiddleware');

const router = express.Router();
router.use(cors());

router.route('/sales')
  .post(validateTokenMiddleware, saleController.createSale)
  .get(validateTokenMiddleware, saleController.getSaleByUserId);

router.route('/sales/:saleid')
  .get(validateTokenMiddleware, saleController.getSaleProducts);
 module.exports = router;