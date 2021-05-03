const loginService = require('../services');

const getUser = async (_req, res) => {
  try {
    const [data] = await loginService.getUser();
    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getUser,
};