const { loginServices } = require('../services');

const login = (request, response) => {
  try {
    const { user } = request.body;
    const result = loginServices.login(user);
    response.send(result);
  } catch (error) {
    response.send('deu ruim');
  }
}

module.exports = {
  login,
}