const express = require('express');
const produdctsControler = require('../controller/productsControler');

const router = express.Router();

router.get('/', produdctsControler.getAllProducts);

module.exports = router;
