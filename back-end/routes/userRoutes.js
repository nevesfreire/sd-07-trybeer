const express = require('express');
const { userController } = require('../controllers');

const router = express.Router();

// (_, res) => { res.send('deu bom'); }
router.post('/login', userController.userRegistration);

module.exports = router;