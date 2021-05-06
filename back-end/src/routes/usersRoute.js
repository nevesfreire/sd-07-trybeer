const express = require('express');
const rescue = require('express-rescue');

const usersController = require('../controllers/usersController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/users', rescue(usersController.createUser));
router.put('/users/:id', authMiddleware, rescue(usersController.updateUser));

module.exports = router;
