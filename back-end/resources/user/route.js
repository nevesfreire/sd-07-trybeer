const express = require('express');
const { getAll } = require('./controller');

const router = express.Router();

router.get('/users', getAll);

module.exports = router;
