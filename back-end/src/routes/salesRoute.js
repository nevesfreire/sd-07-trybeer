const express = require('express');
const { validadeToken } = require('../middlewares/porductsMiddleware');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.post('/sales', validadeToken, salesController.sales);

module.exports = router;