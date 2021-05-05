const express = require('express');
const usersController = require('../controller/usersController');

const router = express.Router();

router.post('/login', usersController.findUserByEmail);

module.exports = router;
