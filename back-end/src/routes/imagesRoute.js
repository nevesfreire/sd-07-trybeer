const express = require('express');
const rescue = require('express-rescue');

const imagesController = require('../controllers/imagesController');

const router = express.Router();

router.get('/images/:name', rescue(imagesController.getImageByName));

module.exports = router;
    