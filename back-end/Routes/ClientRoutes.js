const express = require('express');
const ClienteController = require('../Controllers/ClienteControlles');

const router = express.Router();

router.get('/login', ClienteController.login);


module.exports = router;