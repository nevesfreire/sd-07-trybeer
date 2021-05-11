const router = require('express').Router();
const validateTokenController = require('../controllers/validateTokenController');

router.route('/')
  .post(validateTokenController);

module.exports = router;