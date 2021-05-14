const usersModel = require('../models/usersModel');

const addNewUser = async (name, email, password, role) => {
  await usersModel.addUser(name, email, password, role);
  const user = await usersModel.findByEmail(email);

  return user;
};

const checkEntries = (name, email, password) => {
  if (!name || !email || !password) return false;
  return true;
};

const validateName = (name) => {
  if (name.length < 12) return false;
  return true;
};

const validateEmail = (email) => {
  const regex = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;
  if (!regex.test(email)) return false;
  return true;
};

const validatePassword = (password) => {
  if (password.length < 6) return false;
  return true;
};

const existEmail = async (email) => {
  const user = await usersModel.findByEmail(email);
  if (user === false) return false;

  return true;
};

const allValidates = (name, email, password) => {
  if (
    checkEntries(name, email, password)
    && validateEmail(email)
    && validateName(name)
    && validatePassword(password)
  ) return true;

  return false;
};

module.exports = {
  addNewUser,
  allValidates,
  existEmail,  
};