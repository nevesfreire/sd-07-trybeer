const express = require('express');
const { 
  getAll,
  getAllByUserId,
  getById,
  getOrderById,
  updateStatus,
  create,
} = require('./controller');

const authMiddleware = require('../../middlewares/authMiddleware');

const router = express.Router();

router.get('/admin/orders/:id', getOrderById);
router.put('/admin/orders/:id', updateStatus);
router.get('/sales', authMiddleware, getAll);
router.get('/sales/user/:id', authMiddleware, getAllByUserId);
router.get('/sales/:id', authMiddleware, getById);
router.post('/sales', authMiddleware, create);

module.exports = router;
