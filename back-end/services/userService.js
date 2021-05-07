const userModel = require('../models/userModel');

const ERR_MESSAGE = 'Invalid entries. Try again.';

const validateName = (name) => {
  if (!name || name.length < 12) {
    throw new Error(ERR_MESSAGE);
  }
  return name;
};

const validateEmail = (email) => {
  if (!email) {
    throw new Error(ERR_MESSAGE);
  }
  if (email) {
    const regexEmail = /\S+@\S+\.\S+/;
    if (!regexEmail.test(email)) {
      throw new Error(ERR_MESSAGE);
    }
  }
};

const validatePassword = (password) => {
  const size = 6;
  if (!password && password.length <= size) {
    throw new Error(ERR_MESSAGE);
  }
};

const checkingEmailExists = async (email) => {
  const [exists] = await userModel.getByEmail(email);
  const MESSAGE = 'Email already registered';
  if (exists !== undefined) {
    throw new Error(MESSAGE);
  }
};

const createUser = async (name, email, password, iWantToSell) => {
  validateName(name);
  validateEmail(email);
  validatePassword(password);
  await checkingEmailExists(email);
  let user;
  if (iWantToSell === false) {
    user = await userModel.create(name, email, password);
  } else {
    user = await userModel.createAdmin(name, email, password);
  }
  return user;
};

const userUpdate = async (name, email) => {
  try {
    validateName(name);
    console.log(validateName(name));
    const [user] = await userModel.userUpdate(name, email);
    return user;
  } catch (error) {
    console.log('passei no erro do service');
    console.error(error);
    return error.message;
  }
};

module.exports = {
  createUser,
  userUpdate,
};
