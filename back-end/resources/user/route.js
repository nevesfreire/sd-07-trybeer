const express = require('express');
const { getAll, create } = require('./controller');

const router = express.Router();

router.get('/', getAll);

router.post('/', create);

module.exports = router;
