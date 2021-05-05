const jwt = require('jsonwebtoken');
const connect = require('../../config/config');

const getEmailUser = async (email) => {
  const emailUser = await connect.execute('SELECT * FROM Trybeer.users WHERE email=?', [email]);
  return emailUser;
};

const secret = 'umasenhaqualquer';

const jwtConfig = { expiresIn: '3d', algorithm: 'HS256' };

const token = (user) => {
  const objToken = { id: user.id, name: user.name, email: user.email, role: user.role };

  const myToken = jwt.sign({ data: objToken }, secret, jwtConfig);
  return myToken;
};

module.exports = {
  getEmailUser,
  token,
}
