const express = require('express');
const rescue = require('express-rescue');

const usersController = require('../controllers/usersController');

const router = express.Router();

router.post('/register', rescue(usersController.createUser));

module.exports = router;