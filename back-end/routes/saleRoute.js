const router = require('express').Router();
const Sale = require('../controllers/saleController');

router.route('/')
  .get(Sale.findByUserId)
  .post(Sale.create)
  .put()
  .delete();

router.route('/:id')
  .get(Sale.findSaleDetailsById)
  .post()
  .put()
  .delete();

module.exports = router;