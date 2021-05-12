const express = require('express');
const validateToken = require('../middlewares/validateTokenMid');
const usersController = require('../controllers/userController');

const router = express.Router();

router.post('/', usersController.userCreate);
router.post('/validate', validateToken,usersController.userCreate);
router.put('/:id', validateToken, usersController.userUpdate); // incluir validateToken

module.exports = router;
