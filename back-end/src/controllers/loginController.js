const { StatusCodes } = require('http-status-codes');
const userModel = require('../models/usersModel');
const { userToken } = require('../utils/auth');

const onLogin = async (request, response) => {
  try {
    const { email } = request.body;
    const user = await userModel.findByEmail(email);
    const token = userToken(user);
    delete user[0].password;

    const userWithToken = { ...user, token };
    return response.status(StatusCodes.OK).json(userWithToken);
  } catch (error) {
    console.error(error);
    return response.status(StatusCodes.BAD_REQUEST)
      .json({ message: error.message });
  }
};

module.exports = { onLogin };
