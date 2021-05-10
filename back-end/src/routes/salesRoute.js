const express = require('express');
const rescue = require('express-rescue');

const salesController = require('../controllers/salesController');
// const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/sales', rescue(salesController.getAllSales));
router.post('/sales', rescue(salesController.createSale));

module.exports = router;
