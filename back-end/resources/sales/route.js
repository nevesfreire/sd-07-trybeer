const express = require('express');
const { getAll, getAllByUserId, getById, create } = require('./controller');
const authMiddleware = require('../../middlewares/authMiddleware');

const router = express.Router();

router.get('/sales', authMiddleware, getAll);
router.get('/sales/user/:id', authMiddleware, getAllByUserId);
router.get('/sales/:id', authMiddleware, getById);
router.post('/sales', authMiddleware, create);

module.exports = router;