const express = require('express');
const { update } = require('./controller');

const router = express.Router();

router.put('/admin/orders/:id', update);

module.exports = router;
