const express = require('express');

const usersController = require('../controllers/userController')

const router = express.Router();

router.post('/', usersController.userCreate)


module.exports = router;