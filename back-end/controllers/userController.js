const userService = require('../services/userService');

const OK = 200;
const CREATE = 201;
const ERRORUPDATE = 204;
const ERRORVALIDATE = 400;
const CONFLICT = 409;

const userCreate = async (request, response) => {
  try {
    const { name, email, password, iWantToSell } = request.body;
    const user = await userService.createUser(
      name,
      email,
      password,
      iWantToSell,
    );
    return response.status(CREATE).json({ user });
  } catch (error) {
    console.error(error);

    const { message } = error;
    if (message.includes('registered')) {
      return response.status(CONFLICT).json({ message });
    }
    response.status(ERRORVALIDATE).json({ message });
  }
};

const userUpdate = async (request, response) => {
  try {
    const { name, email } = request.body;
    const user = await userService.userUpdate(name, email);
    if (user === 'Invalid entries. Try again.') throw new Error(ERRORUPDATE);
    return response.status(OK).json(user);
  } catch (error) {
    console.error(error);
    if (message.includes('Invalid entries')) {
      return response.status(ERRORVALIDATE).json({ message });
    }
    response.status(ERRORUPDATE).json({ message: error.message });
  }
};

module.exports = {
  userCreate,
  userUpdate,
};
