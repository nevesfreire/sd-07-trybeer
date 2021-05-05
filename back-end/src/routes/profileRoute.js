const express = require('express');
const profileController = require('../controllers/profileController');
const { validateToken } = require('../middlewares/tokenMiddleware');

const router = express.Router();

router.put('/profile', validateToken, profileController.updateName);

module.exports = router;
