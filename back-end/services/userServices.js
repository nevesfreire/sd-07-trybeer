const { CustomError, STATUS_CODE, STATUS_MESSAGE } = require('../helpers');
const { generateToken } = require('../auth');
const { userModels } = require('../models');

const SIX = 6;

const checkIfEmailAndPasswordExist = (email, password) => {
  if (!email || !password) {
    throw new CustomError({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.INVALID_ENTIRES,
    });
  }
};

const checkIfEmailIsValid = (email) => {
  const regex = /\S+@\S+\.\S+/.test(email); // Source: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  if (!regex) {
    throw new CustomError({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.INVALID_ENTIRES,
    });
  }
};

const checkIfPasswordIsValid = (password) => {
  if (password.length < SIX) {
    throw new CustomError({
      status: STATUS_CODE.UNAUTHORIZED,
      message: STATUS_MESSAGE.INVALID_ENTIRES,
    });
  }
};

const checksIfUserHasBeenReturned = (result) => {
  if (!result.length) {
    throw new CustomError({
      status: STATUS_CODE.UNPROCESSABLE_ENTITY,
      message: STATUS_MESSAGE.USER_NOT_FOUND,
    });
  }
};

const userLogin = async (emailFromRequest, password) => {
  checkIfEmailAndPasswordExist(emailFromRequest, password);
  checkIfEmailIsValid(emailFromRequest);
  checkIfPasswordIsValid(password);

  const result = await userModels.findUserByEmail(emailFromRequest);
  checksIfUserHasBeenReturned(result);

  const { name, email, role } = result[0];
  const token = generateToken.create(name, email, role);
  return token;
};

const userEmail = async (email) => {
  const result = await userModels.findUserByEmail(email);
  checksIfUserHasBeenReturned(result);

  return STATUS_MESSAGE.USER_FOUND;
};

const userRegistration = () => {
  const result = userModels.userRegistration();
  return result;
};

module.exports = {
  userLogin,
  userEmail,
  userRegistration,
};
