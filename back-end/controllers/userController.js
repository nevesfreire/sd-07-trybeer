const { STATUS_CODE } = require('../helpers');
const { userServices } = require('../services');

const userLogin = async (request, response) => {
  try {
    const { email, password } = request.body;
    const result = await userServices.userLogin(email, password);
    response.status(STATUS_CODE.SUCCESS).json(result);
  } catch (error) {
    response.status(error.status).json({ message: error.message });
  }
};

const userEmail = async (request, response) => {
    try {
      const { email } = request.params;
      const result = await userServices.userEmail(email);
      response.status(STATUS_CODE.SUCCESS).json({ message: result });
    } catch (error) {
      response.status(error.status).json({ message: error.message });
    }
};

const userRegistration = async (request, response) => {
  try {
    const { name, email, password, seller } = request.body;
    const result = await userServices.userRegistration(name, email, password, seller);
    response.status(STATUS_CODE.CREATED).json(result);
  } catch (error) {
    response.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  userLogin,
  userRegistration,
  userEmail,
};
