const router = require('express').Router();
const User = require('../controllers/userController');

router.route('/')
  .get()
  .post(User.create)
  .put()
  .delete();

module.exports = router;
