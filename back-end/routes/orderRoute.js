const router = require('express').Router();
const Order = require('../controllers/orderController');

router.route('/')
  .get(Order.getOrder)
  .post()
  .put()
  .delete();

router.route('/:id')
  .get(Order.getOrderDetails)
  .post()
  .put(Order.closeOrder)
  .delete();

module.exports = router;