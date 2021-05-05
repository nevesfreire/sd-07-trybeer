const express = require('express');
const { newRegister } = require('../controllers/registerController');
const { validadeRegister } = require('../middlewares/registerMiddleware');

const router = express.Router();

router.post('/register', validadeRegister, newRegister);

module.exports = router;
