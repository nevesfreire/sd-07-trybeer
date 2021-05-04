// const { CustomError, STATUS_CODE } = require('../helpers');
const { userModels } = require('../models');

const userRegistration = () => {
  const result = userModels.userRegistration();
  return result;
};

module.exports = {
  userRegistration,
};
