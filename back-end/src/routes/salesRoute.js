const express = require('express');
const rescue = require('express-rescue');

const salesController = require('../controllers/salesController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/sales', authMiddleware, rescue(salesController.getAllSales));
router.get('/sales/:id', authMiddleware, rescue(salesController.getSaleById));
router.post('/sales', authMiddleware, rescue(salesController.createSale));

module.exports = router;
