const router = require('express').Router();
const Sale = require('../controllers/saleController');

router.route('/')
  .get()
  .post(Sale.create)
  .put()
  .delete();

module.exports = router;