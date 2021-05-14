const { StatusCodes } = require('http-status-codes'); 
const {
  allValidates,
  existEmail,
} = require('../services/registerService');

const validadeRegister = async (request, response, next) => {
  try {
    const { name, email, password, role } = request.body;   
    if (!allValidates(name, email, password, role)) {
      return response.status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Dados inválidos.' });
    }
    const isEmail = await existEmail(email);
    if (isEmail) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Já existe um usuário com esse e-mail.' });
    }
    next();
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

module.exports = {
  validadeRegister,
};
