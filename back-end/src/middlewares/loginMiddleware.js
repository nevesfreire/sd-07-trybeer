const { StatusCodes } = require('http-status-codes'); 
const userModel = require('../models/usersModel');


const checkUserToLogin = (request, response, next) => {
  const { email, password } = request.body;
  if (!email || !password) {
    return response.status(StatusCodes.UNAUTHORIZED)
    .json({ message: 'todos os campos devem ser preenchidos' });
  }
  next();
};

const checkUser = async (request, response, next) => {
  const { email, password } = request.body;
  const findByEmail = await userModel.findByEmail(email);
  
  if (!findByEmail) {
    return response.status(StatusCodes.UNAUTHORIZED)
    .json({ message: 'usuário ou senha incorreta' });
  }

  if (findByEmail.password !== password) {
    return response.status(StatusCodes.UNAUTHORIZED)
    .json({ message: 'usuário ou senha incorreta' });
  }
  next();
};
module.exports = {
  checkUserToLogin,
  checkUser
};
