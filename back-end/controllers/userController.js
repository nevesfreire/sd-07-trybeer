const { STATUS_CODE } = require('../helpers');
const { userServices } = require('../services');

const userlogin = async (request, response) => {
  try {
    const { email, password } = request.body;
    const result = await userServices.userLogin(email, password);
    response.status(STATUS_CODE.CREATED).json(result);
  } catch (error) {
    response.status(error.status).json({ message: error.message });
  }
};

const userRegistration = (request, response) => {
  try {
    const result = userServices.userRegistration();
    response.status(STATUS_CODE.CREATED).json(result);
  } catch (error) {
    response.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  userlogin,
  userRegistration,
};
