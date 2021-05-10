const userService = require('../services/userService');

const OK = 200;
const CREATE = 201;
const ERRORUPDATE = 204;
const ERROR = 400;
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
    response.status(ERROR).json({ message: error.message });
  }
};

const userUpdate = async (request, response) => {
  console.log("estou aqui")
  try {
    const { name, email } = request.body;
      const user = await userService.userUpdate(name, email);
      console.log(user)
      if (user === 'Invalid entries. Try again.') throw new Error(ERRORUPDATE);
    return response.status(OK).json(user);
  } catch (error) {
    console.error(error);
    response.status(ERRORUPDATE).json({ message: error.message });
  }
};

module.exports = {
  userCreate,
  userUpdate,
};
