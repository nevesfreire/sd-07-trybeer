const express = require('express');
const validateToken = require('../middlewares/validateTokenMid');
const usersController = require('../controllers/userController');

const router = express.Router();

router.post('/', usersController.userCreate);

router.put('/:id', validateToken, usersController.userUpdate);

module.exports = router;
