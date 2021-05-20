const userService = require('../services/userService');
const httpStatus = require('../helpers/httpStatus');

module.exports = {
  async get(request, response) {
    try {
      const { body } = request;
      const user = await userService.get(body);
      return response.status(httpStatus.OK).json(user);
    } catch (e) {
      return response.status(e.statusCode).json({ message: e.message });
    }
  },
};