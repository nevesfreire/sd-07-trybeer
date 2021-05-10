const router = require('express').Router();
const Product = require('../controllers/productController');

router.route('/')
  .get(Product.findAll)
  .post()
  .put()
  .delete();

module.exports = router;