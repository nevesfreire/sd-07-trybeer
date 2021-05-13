const express = require('express');
const { getAll, create, getOrders } = require('./controller');

const router = express.Router();

router.get('/users', getAll);
router.get('/orderbyemail/search', getOrders);
router.post('/register', create);

module.exports = router;
