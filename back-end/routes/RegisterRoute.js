const express = require('express');
const rescue = require('express-rescue');

const { registerCtrl } = require('../controllers');

const router = express.Router();

router.post('/register', rescue(registerCtrl));