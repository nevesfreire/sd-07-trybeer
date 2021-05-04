const express = require('express');
const cors = require('cors');
const { userController } = require('../controllers');

const router = express.Router();
router.use(cors());

router.route('/user')
  .post(userController.createUser);

module.exports = router;