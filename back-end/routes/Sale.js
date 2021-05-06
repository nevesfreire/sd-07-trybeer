const express = require('express');
const cors = require('cors');
const { saleController } = require('../controllers');
const validateTokenMiddleware = require('../middlewares/validateTokenMiddleware');

const router = express.Router();
router.use(cors());

router.route('/sale')
  .post(saleController.createSale);

module.exports = router;