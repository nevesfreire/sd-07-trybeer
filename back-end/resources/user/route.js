const express = require('express');
const { getAll, create } = require('./controller');

const router = express.Router();

router.get('/users', getAll);

router.post('/register', create);

module.exports = router;
