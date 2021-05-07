const express = require('express');
const { getAll } = require('./controller');
const authMiddleware = require('../../middlewares/authMiddleware');

const router = express.Router();

router.get('/products', authMiddleware, getAll);

module.exports = router;