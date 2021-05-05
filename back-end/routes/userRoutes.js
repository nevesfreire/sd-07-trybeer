const express = require('express');
const { userController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

const router = express.Router();

// (_, res) => { res.send('deu bom'); }
router.post('/login', userController.userLogin);
router.post('/login/:email', userController.userEmail);
router.post('/registration', userController.userRegistration);
router.put('/profile', authMiddleware.checkIfUserIsAuthenticated, userController.userProfile );

module.exports = router;
