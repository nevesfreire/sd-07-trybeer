const { STATUS_MESSAGE, validationsHelper } = require('../helpers');
const { generateToken, decodeToken } = require('../auth');
const { userModels } = require('../models');

const userLogin = async (emailFromRequest, password) => {
  validationsHelper.checkIfEmailAndPasswordExist(emailFromRequest, password);
  validationsHelper.checkIfEmailIsValid(emailFromRequest);
  validationsHelper.checkIfPasswordIsValid(password);

  const result = await userModels.findUserByEmail(emailFromRequest);
  validationsHelper.checksIfUserHasBeenReturned(result);

  const { name, email, role } = result[0];
  const token = generateToken.create(name, email, role);
  const obj = {
    name,
    email,
    token,
    role,
  };
  return obj;
};

const userEmail = async (email) => {
  const result = await userModels.findUserByEmail(email);
  validationsHelper.checksIfUserHasBeenReturned(result);

  return STATUS_MESSAGE.USER_FOUND;
};

const userRegistration = async (name, email, password, seller) => {
  validationsHelper.checkIfNameEmailPasswordAndSellerExist(name, email, password, seller);
  validationsHelper.checkIfNameIsValid(name);
  validationsHelper.checkIfEmailIsValid(email);

  const emailExist = await userModels.findUserByEmail(email);
  validationsHelper.checkIfEmailExist(emailExist);
  validationsHelper.checkIfPasswordIsValid(password);

  const role = seller ? 'administrator' : 'client'; 
  await userModels.userRegistration(name, email, password, role);

  return { message: STATUS_MESSAGE.USER_CREATED };
};

const userProfile = async (name, email, authorization) => {
  const decodedToken = decodeToken.decode(authorization);
  validationsHelper.checkIfUserIsOwner(email, decodedToken.email);
  validationsHelper.checkIfEmailAndNameExist(name, email);
  validationsHelper.checkIfNameIsValid(name);
  validationsHelper.checkIfEmailIsValid(email);
  await userModels.userProfile(name, email);
  return { message: STATUS_MESSAGE.NAME_UPDATED };
};

module.exports = {
  userLogin,
  userEmail,
  userRegistration,
  userProfile,
};
