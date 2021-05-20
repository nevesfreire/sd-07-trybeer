const authenticationService = require('../services/authenticationService');
const httpStatus = require('../helpers/httpStatus');

module.exports = {
  async getToken(request, response) {
    try {
      const { body } = request;
      const token = await authenticationService.getToken(body);
      return response.status(httpStatus.OK).json({ token });
    } catch (e) {
      return response.status(e.statusCode).json({ message: e.message });
    }
  },
};