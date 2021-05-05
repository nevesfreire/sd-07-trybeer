const express = require('express');
const { userController } = require('../controllers');

const router = express.Router();

// (_, res) => { res.send('deu bom'); }
router.post('/login', userController.userLogin);
router.post('/login/:email', userController.userEmail);
router.post('/registration', userController.userRegistration);
router.get('/data', userController.data);

module.exports = router;
