const router = require('express').Router();
const User = require('../controllers/userController');

router.route('/')
  .get()
  .post(User.create)
  .put(User.updateUser)
  .delete();

module.exports = router;