const { StatusCodes } = require('http-status-codes');
const registerService = require('../services/registerService');
const { userToken } = require('../utils/auth');

const newRegister = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await registerService.addNewUser(name, email, password, role);
    const token = userToken(user);
    delete user[0].password;

    const userWithToken = { ...user[0], token };
    res.status(StatusCodes.CREATED).json(userWithToken);
  } catch (error) {
    console.error(error.message);
    return res.status(StatusCodes.BAD_REQUEST)
      .json({ message: error.message });
  }
};

module.exports = {
  newRegister,
};
