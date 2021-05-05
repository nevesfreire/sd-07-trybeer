const JWT = require('jsonwebtoken');
const model = require('../users/models');
const SECRET = process.env.SECRET;

const validateCreateLoginToken = async (userEmail) => {
  const user = await model.getByEmail(userEmail);
  if(!user){
    throw new Error('User not found');
  }
  const userCopy = {...user};
  delete userCopy.password;
  delete userCopy.id;

  const jwtConfig = {
    expiresIn: 60 * 5,
    algorithm: 'HS256',
  };

  // name, email e role
  const token = JWT.sign({ ...userCopy }, SECRET, jwtConfig);
  return { ...userCopy, token };
};


module.exports = {
  validateCreateLoginToken,
}
