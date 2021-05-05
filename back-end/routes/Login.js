const express = require('express');
const cors = require('cors');
const validateTokenMiddleware = require('../middlewares/validateTokenMiddleware');

const { loginController } = require('../controllers');

const router = express.Router();

router.use(cors());

router.route('/login')
  .post(cors(), loginController.getUser);

router.get('/teste', validateTokenMiddleware, async (req, res) => {
  try {
    const { user } = req;
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;