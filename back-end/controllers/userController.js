const userService = require('../services/userService');
const httpStatus = require('../helpers/httpStatus');

module.exports = {
  get(request, response) {
    try {
      const { body } = request;
      const user = userService.get(body);
      return response.status(httpStatus.OK).json(user);
    } catch (e) {
      return response.status(e.statusCode).json({ message: e.message });
    }
  },
};