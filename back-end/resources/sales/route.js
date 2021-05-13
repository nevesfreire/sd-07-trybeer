const express = require('express');
const { updateStatus } = require('./controller');

const router = express.Router();

router.put('/admin/orders/:id', updateStatus);

module.exports = router;
