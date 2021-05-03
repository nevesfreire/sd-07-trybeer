const express = require('express');

const router = express.Router();
const UserController = require('./controller/UserController');

router.get('/user', UserController.create);

module.exports = router;