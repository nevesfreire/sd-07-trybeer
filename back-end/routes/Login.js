const express = require('express');
const cors = require('cors');
const { loginController } = require('../controllers');

const router = express.Router();

router.route('/login')
  .get(cors(), loginController.getUser);

module.exports = router;