const express = require('express');
const { getById, updateStatus } = require('./controller');

const router = express.Router();

router.get('/admin/orders/:id', getById);
router.put('/admin/orders/:id', updateStatus);

module.exports = router;
