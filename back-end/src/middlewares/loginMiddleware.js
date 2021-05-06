const { StatusCodes } = require('http-status-codes'); 
const { checkUserAndPass } = require('../services/loginService');

const validadeLogin = async (request, response, next) => {
  try {
    const { email, password } = request.body; 
    if (!checkUserAndPass(email, password)) {
      return response.status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'usuário ou senha incorreta' });
    }
    next();
  } catch (error) {
    return response.status(StatusCodes.BAD_REQUEST)
      .json({ message: error.message });
  }
};

module.exports = {
  validadeLogin,
};
