const express = require('express');
const ClienteController = require('../Controllers/ClienteControlles');

const router = express.Router();

router.post('/login', ClienteController.login);
router.put('/profile', ClienteController.updateUserName);

module.exports = router;