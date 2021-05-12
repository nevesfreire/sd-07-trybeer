const router = require('express').Router();
const Order = require('../controllers/orderController');

router.route('/')
  .get()
  .post()
  .put()
  .delete();

router.route('/:id')
  .get(Order.getOrderDetails)
  .post()
  .put()
  .delete();

module.exports = router;