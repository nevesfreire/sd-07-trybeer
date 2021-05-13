const express = require('express');
const { validadeToken } = require('../middlewares/productsMiddleware');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.post('/sales', validadeToken, salesController.sales);
//router.get

module.exports = router;
