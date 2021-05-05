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
  // const { _id, email, role } = user;
  console.log('userCopy', userCopy);

  const jwtConfig = {
    expiresIn: 60 * 5,
    algorithm: 'HS256',
  };

  // id, email e role
  const token = JWT.sign({ ...userCopy }, SECRET, jwtConfig);
  console.log(userCopy);
  return { ...userCopy, token };
};


module.exports = {
  validateCreateLoginToken,
}
