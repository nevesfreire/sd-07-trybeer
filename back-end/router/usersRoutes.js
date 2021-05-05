const express = require('express');
const usersController = require('../controller/usersController');

const router = express.Router();

router.get('/login', usersController.findUserByEmail);

module.exports = router;
