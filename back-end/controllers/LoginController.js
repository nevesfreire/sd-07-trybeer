const { loginService } = require('../services');

const getUser = async (req, res) => {
  try {
    const { body } = req;
    const data = await loginService.getUser(body);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

module.exports = {
  getUser,
};