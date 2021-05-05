const express = require('express');
const checkToken = require('./middleware/checkToken');

const router = express.Router();
const UserController = require('./controller/UserController');

router.post('/user', UserController.create);
router.post('/updateUserEmail', checkToken, UserController.updateUserEmail);
router.post('/login', UserController.login);
router.get('/token', checkToken, (req, res) => { res.send({ message: 'funcionando 100%' }); });

module.exports = router;