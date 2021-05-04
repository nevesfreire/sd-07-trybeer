const express = require('express');
const userController = require('../controllers/usersControllers');

const router = express.Router();

router.post('/login', userController.loginUser)

module.exports = router;