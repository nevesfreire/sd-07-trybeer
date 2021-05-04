const jwt = require('jsonwebtoken');

const usersModel = require('../models/usersModel');

// -----------------------------------------------------

const FILLED_FIELDS_MESSAGE = 'All fields must be filled';
const INCORRECT_DATA_MESSAGE = 'Incorrect username or password';

const verifyEntries = (email, password, allUsers) => {
  const userEmailIsValid = allUsers.some((element) => element.email === email);
  const userPasswordIsValid = allUsers.some(
    (element) => element.password === password,
  );

  if (email === undefined || password === undefined) {
    throw new Error(FILLED_FIELDS_MESSAGE);
  } else if (!userEmailIsValid || !userPasswordIsValid) {
    throw new Error(INCORRECT_DATA_MESSAGE);
  }
};

// -----------------------------------------------------

const secret = 'secret';

const loginUser = async (email, password) => {
  const user = await usersModel.getUserByEmail(email);
  const allUsers = await usersModel.getAllUsers();

  try {
    verifyEntries(email, password, allUsers);

    const jwtConfig = {
      expiresIn: 60 * 5,
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: user }, secret, jwtConfig);
    return token;
  } catch (error) {
    return error.message;
  }
};

module.exports = { loginUser };
