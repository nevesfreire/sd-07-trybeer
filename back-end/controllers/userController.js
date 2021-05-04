const { STATUS_CODE } = require('../helpers');
const { userServices } = require('../services');

const userRegistration = (request, response) => {
  try {
    const result = userServices.userRegistration();
    response.status(STATUS_CODE.CREATED).json(result);
  } catch (error) {
    response.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  userRegistration,
};
