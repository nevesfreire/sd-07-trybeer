const express = require('express');
const usersController = require('../controller/salesController');

const router = express.Router();

router.post('/createsale', usersController.createSale);

module.exports = router;
