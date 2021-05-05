const router = require('express').Router();
const Login = require('../controllers/loginController');

router.route('/')
  .get(Login)
  .post()
  .put()
  .delete();

module.exports = router;