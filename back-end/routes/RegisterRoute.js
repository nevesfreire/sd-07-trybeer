const express = require('express');
const rescue = require('express-rescue');

const { registerCtrl } = require('../controllers');
const checkUser = require('../middlewares/checkUser');

const router = express.Router();

router.post('/register', checkUser, rescue(registerCtrl));

module.exports = router;
