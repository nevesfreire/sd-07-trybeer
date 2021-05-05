const userService = require('../services/userService');

const OK = 200;
const CREATE = 201;
const ERROR = 400;
const CONFLICT = 409;

const userCreate = async (request, response) => {
  try {
    const { name, email, password, iWantToSell } = request.body;
    const user = await userService.createUser(
      name,
      email,
      password,
      iWantToSell
    );
    
    return response.status(CREATE).json({ user });
  } catch (error) {
    console.error(error);

    const { message } = error;
    if (message.includes('registered')) {
      return response.status(CONFLICT).json({ message });
    }
    response.status(ERROR).json({ message: error.message });
  }
};

module.exports = {
  userCreate,
};
